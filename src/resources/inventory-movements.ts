// src/resources/inventory-movements.ts
import { BaseResource } from "./base";
import type { ApiResponse, PaginatedResponse } from "../core/types";
import type {
  InventoryMovement, CreateInventoryMovementParams, ListInventoryMovementsParams,
} from "../types/inventory-movements";

export class InventoryMovementsResource extends BaseResource {
  async list(params?: ListInventoryMovementsParams): Promise<PaginatedResponse<InventoryMovement>> {
    return this.http.get<PaginatedResponse<InventoryMovement>>("/inventory/movements", params as Record<string, unknown>);
  }

  async create(params: CreateInventoryMovementParams): Promise<ApiResponse<InventoryMovement>> {
    return this.http.post<ApiResponse<InventoryMovement>>("/inventory/movements/create", params);
  }
}
