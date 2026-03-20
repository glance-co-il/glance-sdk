// src/types/products.ts
import type { PaginationParams } from "./shared";

export interface Product {
  id: number;
  visibleId: string;
  name: string;
  sku: string;
  description?: string;
  unit?: string;
  fileId?: number;
  vendorId?: number;
  isPhysical?: boolean;
  unitCost?: number;
  buyingPrice?: number;
  minStockLevel?: number;
  maxStockLevel?: number;
  trackSerialNumbers?: boolean;
  isActive?: boolean;
  isWithInventory?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductParams {
  name: string;
  sku: string;
  description?: string;
  unit?: string;
  fileId?: number;
  vendorId?: number;
  isPhysical?: boolean;
  unitCost?: number;
  buyingPrice?: number;
  minStockLevel?: number;
  maxStockLevel?: number;
  trackSerialNumbers?: boolean;
  isWithInventory?: boolean;
  warehouseId?: number;
  startingInventory?: number;
  inventoryLocation?: string;
}

export type UpdateProductParams = Partial<CreateProductParams>;

export interface ListProductsParams extends PaginationParams {
  search?: string;
  vendorId?: number;
  isPhysical?: boolean;
}
