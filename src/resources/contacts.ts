// src/resources/contacts.ts
import { BaseResource } from "./base";
import type { ApiResponse, PaginatedResponse } from "../core/types";
import type { Contact, CreateContactParams, UpdateContactParams, ListContactsParams } from "../types/contacts";

export class ContactsResource extends BaseResource {
  async list(params?: ListContactsParams): Promise<PaginatedResponse<Contact>> {
    return this.http.get<PaginatedResponse<Contact>>("/contacts", params as Record<string, unknown>);
  }

  async get(visibleId: string): Promise<ApiResponse<Contact>> {
    return this.http.get<ApiResponse<Contact>>(`/contacts/id/${visibleId}`);
  }

  async create(params: CreateContactParams): Promise<ApiResponse<Contact>> {
    return this.http.post<ApiResponse<Contact>>("/contacts/create", params);
  }

  async update(visibleId: string, params: UpdateContactParams): Promise<ApiResponse<Contact>> {
    return this.http.put<ApiResponse<Contact>>(`/contacts/edit/${visibleId}`, params);
  }

  async delete(visibleId: string): Promise<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`/contacts/delete/${visibleId}`);
  }
}
