// src/resources/clients.ts
import { BaseResource } from "./base";
import type { ApiResponse, PaginatedResponse } from "../core/types";
import type { Client, CreateClientParams, UpdateClientParams, ListClientsParams } from "../types/clients";

export class ClientsResource extends BaseResource {
  async list(params?: ListClientsParams): Promise<PaginatedResponse<Client>> {
    return this.http.get<PaginatedResponse<Client>>("/clients", params as Record<string, unknown>);
  }

  async get(visibleId: string): Promise<ApiResponse<Client>> {
    return this.http.get<ApiResponse<Client>>(`/clients/id/${visibleId}`);
  }

  async create(params: CreateClientParams): Promise<ApiResponse<Client>> {
    return this.http.post<ApiResponse<Client>>("/clients/create", params);
  }

  async update(visibleId: string, params: UpdateClientParams): Promise<ApiResponse<Client>> {
    return this.http.put<ApiResponse<Client>>(`/clients/edit/${visibleId}`, params);
  }
}
