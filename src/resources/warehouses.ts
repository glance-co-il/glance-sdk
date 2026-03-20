// src/resources/warehouses.ts
import { BaseResource } from "./base";
import type { ApiResponse, PaginatedResponse } from "../core/types";
import type { Warehouse, CreateWarehouseParams, UpdateWarehouseParams, ListWarehousesParams } from "../types/warehouses";

export class WarehousesResource extends BaseResource {
  async list(params?: ListWarehousesParams): Promise<PaginatedResponse<Warehouse>> {
    return this.http.get<PaginatedResponse<Warehouse>>("/warehouses", params as Record<string, unknown>);
  }

  async get(id: number): Promise<ApiResponse<Warehouse>> {
    return this.http.get<ApiResponse<Warehouse>>(`/warehouses/${id}`);
  }

  async create(params: CreateWarehouseParams): Promise<ApiResponse<Warehouse>> {
    return this.http.post<ApiResponse<Warehouse>>("/warehouses", params);
  }

  async update(id: number, params: UpdateWarehouseParams): Promise<ApiResponse<Warehouse>> {
    return this.http.put<ApiResponse<Warehouse>>(`/warehouses/${id}`, params);
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`/warehouses/${id}`);
  }
}
