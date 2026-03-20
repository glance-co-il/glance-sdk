// src/types/vendors.ts
import type { PaginationParams } from "./shared";

export interface Vendor {
  visibleId: string;
  name: string;
  taxId?: string;
  email?: string;
  bankNumber?: string;
  branchNumber?: string;
  accountNumber?: string;
}

export interface CreateVendorParams {
  name: string;
  taxId?: string;
  email?: string;
  bankNumber?: string;
  branchNumber?: string;
  accountNumber?: string;
}

export type UpdateVendorParams = Partial<CreateVendorParams>;

export interface ListVendorsParams extends PaginationParams {
  search?: string;
}
