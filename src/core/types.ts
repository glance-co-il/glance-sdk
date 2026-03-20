export interface GlanceClientOptions {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
  fetch?: typeof globalThis.fetch;
}

export interface ApiResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    status: number;
    message: string;
    code: string;
    issues?: unknown[];
  };
}

export interface PaginationMeta {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  pagination: PaginationMeta;
}

export interface RequestOptions {
  signal?: AbortSignal;
}
