// src/types/product-serials.ts
import type { SerialStatus, PaginationParams } from "./shared";

export interface ProductSerial {
  id: number;
  visibleId: string;
  productId: number;
  warehouseId: number;
  serialNumber: string;
  status: SerialStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductSerialsParams {
  serials: Array<{
    serialNumber: string;
    warehouseId: number;
  }>;
}

export interface UpdateProductSerialParams {
  serialNumber?: string;
  warehouseId?: number;
  status?: SerialStatus;
}

export type ListProductSerialsParams = PaginationParams;
