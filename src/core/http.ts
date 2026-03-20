import type { GlanceClientOptions, RequestOptions } from "./types";
import {
  GlanceApiError, GlanceAuthenticationError, GlanceNotFoundError,
  GlanceValidationError, GlanceRateLimitError, GlanceError,
} from "./errors";

export class HttpClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly timeout: number;
  private readonly _fetch: typeof globalThis.fetch;

  constructor(options: GlanceClientOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = (options.baseUrl ?? "https://api.glance.co.il").replace(/\/$/, "");
    this.timeout = options.timeout ?? 30_000;
    this._fetch = options.fetch ?? globalThis.fetch;
  }

  async get<T>(path: string, query?: Record<string, unknown>, options?: RequestOptions): Promise<T> {
    return this.request<T>("GET", path, undefined, query, options);
  }

  async post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>("POST", path, body, undefined, options);
  }

  async put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>("PUT", path, body, undefined, options);
  }

  async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("DELETE", path, undefined, undefined, options);
  }

  private async request<T>(
    method: string, path: string, body?: unknown,
    query?: Record<string, unknown>, options?: RequestOptions,
  ): Promise<T> {
    let url = `${this.baseUrl}${path}`;
    if (query) {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined && value !== null) {
          params.set(key, String(value));
        }
      }
      const qs = params.toString();
      if (qs) url += `?${qs}`;
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.apiKey}`,
      Accept: "application/json",
    };
    if (body !== undefined) {
      headers["Content-Type"] = "application/json";
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    let signal: AbortSignal = controller.signal;
    if (options?.signal) {
      if (typeof AbortSignal.any === "function") {
        signal = AbortSignal.any([controller.signal, options.signal]);
      } else {
        options.signal.addEventListener("abort", () => controller.abort(), { once: true });
      }
    }

    try {
      const response = await this._fetch(url, {
        method, headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal,
      });
      const json = await response.json();
      if (!response.ok) {
        throw this.createError(response.status, json);
      }
      return json as T;
    } catch (error) {
      if (error instanceof GlanceError) throw error;
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new GlanceError("Request timed out");
      }
      throw new GlanceError(`Network error: ${(error as Error).message}`);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private createError(status: number, json: unknown): GlanceApiError {
    const body = json as { error?: { message?: string; code?: string; issues?: unknown[] } };
    const message = body?.error?.message ?? "Unknown error";
    const code = body?.error?.code;
    const issues = body?.error?.issues;
    switch (status) {
      case 400: return new GlanceValidationError(message, issues);
      case 401: case 403: return new GlanceAuthenticationError(message);
      case 404: return new GlanceNotFoundError(message, code);
      case 429: return new GlanceRateLimitError(message);
      default: return new GlanceApiError(status, message, code);
    }
  }
}
