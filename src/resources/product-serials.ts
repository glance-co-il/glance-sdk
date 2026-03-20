// src/resources/product-serials.ts
import { BaseResource } from "./base";
import type { ApiResponse, PaginatedResponse } from "../core/types";
import type { ProductSerial, CreateProductSerialsParams, UpdateProductSerialParams } from "../types/product-serials";

export class ProductSerialsResource extends BaseResource {
  async list(productId: number): Promise<PaginatedResponse<ProductSerial>> {
    return this.http.get<PaginatedResponse<ProductSerial>>(`/products/id/${productId}/serials`);
  }

  async create(productId: number, params: CreateProductSerialsParams): Promise<ApiResponse<ProductSerial[]>> {
    return this.http.post<ApiResponse<ProductSerial[]>>(`/products/id/${productId}/serials`, params);
  }

  async update(serialId: number, params: UpdateProductSerialParams): Promise<ApiResponse<ProductSerial>> {
    return this.http.put<ApiResponse<ProductSerial>>(`/products/serials/${serialId}`, params);
  }

  async delete(serialId: number): Promise<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`/products/serials/${serialId}`);
  }
}
