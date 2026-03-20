// src/resources/inventory.ts
import { BaseResource } from "./base";
import type { ApiResponse, PaginatedResponse } from "../core/types";
import type {
  Inventory, CreateInventoryParams, UpdateInventoryParams,
  AdjustInventoryParams, ListInventoryParams,
} from "../types/inventory";

export class InventoryResource extends BaseResource {
  async list(params?: ListInventoryParams): Promise<PaginatedResponse<Inventory>> {
    return this.http.get<PaginatedResponse<Inventory>>("/inventory", params as Record<string, unknown>);
  }

  async get(id: number): Promise<ApiResponse<Inventory>> {
    return this.http.get<ApiResponse<Inventory>>(`/inventory/${id}`);
  }

  async getByProduct(productId: number): Promise<ApiResponse<Inventory[]>> {
    return this.http.get<ApiResponse<Inventory[]>>(`/inventory/product/${productId}`);
  }

  async create(params: CreateInventoryParams): Promise<ApiResponse<Inventory>> {
    return this.http.post<ApiResponse<Inventory>>("/inventory/create", params);
  }

  async update(id: number, params: UpdateInventoryParams): Promise<ApiResponse<Inventory>> {
    return this.http.put<ApiResponse<Inventory>>(`/inventory/${id}/edit`, params);
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`/inventory/${id}/delete`);
  }

  async adjust(params: AdjustInventoryParams): Promise<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>("/inventory/adjust", params);
  }
}
