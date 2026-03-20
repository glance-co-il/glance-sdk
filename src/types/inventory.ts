// src/types/inventory.ts
import type { PaginationParams } from "./shared";

export interface Inventory {
  id: number;
  visibleId: string;
  productId: number;
  warehouseId: number;
  quantity: number;
  reservedQuantity?: number;
  minStockLevel?: number;
  maxStockLevel?: number;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateInventoryParams {
  productId: number;
  warehouseId: number;
  quantity?: number;
  location?: string;
}

export interface UpdateInventoryParams {
  quantity?: number;
  location?: string;
}

export interface AdjustInventoryParams {
  actions: Array<{
    productId: number;
    warehouseId: number;
    amount: number;
    reason?: string;
    notes?: string;
  }>;
}

export interface ListInventoryParams extends PaginationParams {
  search?: string;
  warehouseId?: number;
}
