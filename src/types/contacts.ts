// src/types/contacts.ts
import type { PaginationParams } from "./shared";

export interface Contact {
  visibleId: string;
  firstName: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  addressId?: number;
  clientVisibleId?: string;
}

export interface CreateContactParams {
  firstName: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  addressId?: number;
  clientVisibleId?: string;
}

export type UpdateContactParams = Partial<CreateContactParams>;

export interface ListContactsParams extends PaginationParams {
  search?: string;
}
