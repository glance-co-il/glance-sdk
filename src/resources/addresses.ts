// src/resources/addresses.ts
import { BaseResource } from "./base";
import type { ApiResponse, PaginatedResponse } from "../core/types";
import type { Address, CreateAddressParams, UpdateAddressParams, ListAddressesParams } from "../types/addresses";

export class AddressesResource extends BaseResource {
  async list(params?: ListAddressesParams): Promise<PaginatedResponse<Address>> {
    return this.http.get<PaginatedResponse<Address>>("/addresses", params as Record<string, unknown>);
  }

  async get(id: number): Promise<ApiResponse<Address>> {
    return this.http.get<ApiResponse<Address>>(`/addresses/id/${id}`);
  }

  async create(params: CreateAddressParams): Promise<ApiResponse<Address>> {
    return this.http.post<ApiResponse<Address>>("/addresses/create", params);
  }

  async update(id: number, params: UpdateAddressParams): Promise<ApiResponse<Address>> {
    return this.http.put<ApiResponse<Address>>(`/addresses/${id}`, params);
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`/addresses/${id}`);
  }
}
