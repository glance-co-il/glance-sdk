// src/resources/vendors.ts
import { BaseResource } from "./base";
import type { ApiResponse, PaginatedResponse } from "../core/types";
import type { Vendor, CreateVendorParams, UpdateVendorParams, ListVendorsParams } from "../types/vendors";

export class VendorsResource extends BaseResource {
  async list(params?: ListVendorsParams): Promise<PaginatedResponse<Vendor>> {
    return this.http.get<PaginatedResponse<Vendor>>("/vendors", params as Record<string, unknown>);
  }

  async get(visibleId: string): Promise<ApiResponse<Vendor>> {
    return this.http.get<ApiResponse<Vendor>>(`/vendors/id/${visibleId}`);
  }

  async create(params: CreateVendorParams): Promise<ApiResponse<Vendor>> {
    return this.http.post<ApiResponse<Vendor>>("/vendors/create", params);
  }

  async update(visibleId: string, params: UpdateVendorParams): Promise<ApiResponse<Vendor>> {
    return this.http.put<ApiResponse<Vendor>>(`/vendors/edit/${visibleId}`, params);
  }
}
