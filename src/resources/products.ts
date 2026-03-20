// src/resources/products.ts
import { BaseResource } from "./base";
import type { ApiResponse, PaginatedResponse } from "../core/types";
import type { Product, CreateProductParams, UpdateProductParams, ListProductsParams } from "../types/products";

export class ProductsResource extends BaseResource {
  async list(params?: ListProductsParams): Promise<PaginatedResponse<Product>> {
    return this.http.get<PaginatedResponse<Product>>("/products", params as Record<string, unknown>);
  }

  async get(id: number): Promise<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`/products/id/${id}`);
  }

  async getBySku(sku: string): Promise<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`/products/sku/${sku}`);
  }

  async create(params: CreateProductParams): Promise<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>("/products/create", params);
  }

  async update(id: number, params: UpdateProductParams): Promise<ApiResponse<Product>> {
    return this.http.put<ApiResponse<Product>>(`/products/edit/${id}`, params);
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`/products/delete/${id}`);
  }
}
