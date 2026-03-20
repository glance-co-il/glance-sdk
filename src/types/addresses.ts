// src/types/addresses.ts
import type { PaginationParams } from "./shared";

export interface Address {
  id: number;
  name?: string;
  street: string;
  streetNumber?: string;
  city: string;
  notes?: string;
}

export interface CreateAddressParams {
  name?: string;
  street: string;
  streetNumber?: string;
  city: string;
  notes?: string;
}

export type UpdateAddressParams = Partial<CreateAddressParams>;

export interface ListAddressesParams extends PaginationParams {
  search?: string;
}
