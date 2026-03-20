// src/resources/retainers.ts
import { BaseResource } from "./base";
import type { ApiResponse, PaginatedResponse } from "../core/types";
import type { Retainer, CreateRetainerParams, UpdateRetainerParams, ListRetainersParams } from "../types/retainers";

export class RetainersResource extends BaseResource {
  async list(params?: ListRetainersParams): Promise<PaginatedResponse<Retainer>> {
    return this.http.get<PaginatedResponse<Retainer>>("/retainers", params as Record<string, unknown>);
  }

  async get(id: string): Promise<ApiResponse<Retainer>> {
    return this.http.get<ApiResponse<Retainer>>(`/retainers/${id}`);
  }

  async create(params: CreateRetainerParams): Promise<ApiResponse<Retainer>> {
    return this.http.post<ApiResponse<Retainer>>("/retainers/create", params);
  }

  async update(id: string, params: UpdateRetainerParams): Promise<ApiResponse<Retainer>> {
    return this.http.put<ApiResponse<Retainer>>(`/retainers/${id}`, params);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`/retainers/${id}`);
  }

  async reactivate(id: string): Promise<ApiResponse<Retainer>> {
    return this.http.post<ApiResponse<Retainer>>(`/retainers/reactivate/${id}`);
  }
}
