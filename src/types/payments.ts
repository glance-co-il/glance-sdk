// src/types/payments.ts
import type { PaginationParams } from "./shared";

export interface Transaction {
  id: string;
  amount: number;
  currency?: string;
  status: string;
  description?: string;
  clientId?: string;
  documentId?: string;
  createdAt?: string;
}

export interface ChargeParams {
  amount: number;
  cardToken: string;
  currency?: string;
  description?: string;
  clientId?: string;
  documentId?: string;
}

export interface RefundParams {
  transactionId: string;
  amount: number;
  reason: string;
}

export interface ListTransactionsParams extends PaginationParams {
  startDate?: string;
  endDate?: string;
  status?: string;
}
