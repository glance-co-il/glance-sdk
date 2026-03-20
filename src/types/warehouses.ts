// src/types/warehouses.ts
import type { PaginationParams } from "./shared";

export interface Warehouse {
  id: number;
  visibleId: string;
  name: string;
  code?: string;
  description?: string;
  addressId?: number;
  isActive?: boolean;
  isDefault?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateWarehouseParams {
  name: string;
  code?: string;
  description?: string;
  addressId?: number;
}

export type UpdateWarehouseParams = Partial<CreateWarehouseParams>;
export type ListWarehousesParams = PaginationParams;
