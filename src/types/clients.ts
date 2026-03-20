// src/types/clients.ts
import type { ClientType, PaymentTermType, PaginationParams } from "./shared";
import type { Contact } from "./contacts";
import type { Address } from "./addresses";

export interface Client {
  visibleId: string;
  name: string;
  taxId?: string;
  type?: ClientType;
  email?: string;
  addressId?: number;
  logoFileId?: number;
  bankNumber?: string;
  branchNumber?: string;
  accountNumber?: string;
  paymentTermType?: PaymentTermType;
  paymentTermDays?: number;
  contacts?: Contact[];
  addresses?: Address[];
}

export interface CreateClientParams {
  name: string;
  taxId?: string;
  type?: ClientType;
  email?: string;
  addressId?: number;
  logoFileId?: number;
  bankNumber?: string;
  branchNumber?: string;
  accountNumber?: string;
  paymentTermType?: PaymentTermType;
  paymentTermDays?: number;
  existingContactId?: number;
  contact?: {
    firstName: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    addressId?: number;
  };
}

export type UpdateClientParams = Partial<CreateClientParams>;

export interface ListClientsParams extends PaginationParams {
  search?: string;
  type?: ClientType;
  email?: string;
  taxId?: string;
  hasContacts?: boolean;
}
