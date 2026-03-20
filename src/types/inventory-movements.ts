// src/types/inventory-movements.ts
import type { PaginationParams } from "./shared";

export interface InventoryMovement {
  id: number;
  productId: number;
  fromWarehouseId?: number;
  toWarehouseId?: number;
  quantity: number;
  type: string;
  reason?: string;
  createdAt?: string;
}

export interface CreateInventoryMovementParams {
  productId: number;
  quantity: number;
  fromWarehouseId?: number;
  toWarehouseId?: number;
  reason?: string;
}

export interface ListInventoryMovementsParams extends PaginationParams {
  productId?: number;
  warehouseId?: number;
  type?: string;
  startDate?: string;
  endDate?: string;
}
