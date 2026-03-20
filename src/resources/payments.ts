// src/resources/payments.ts
import { BaseResource } from "./base";
import type { ApiResponse, PaginatedResponse } from "../core/types";
import type { Transaction, ChargeParams, RefundParams, ListTransactionsParams } from "../types/payments";

export class PaymentsResource extends BaseResource {
  async charge(params: ChargeParams): Promise<ApiResponse<Transaction>> {
    return this.http.post<ApiResponse<Transaction>>("/grow/payments/charge", params);
  }

  async refund(params: RefundParams): Promise<ApiResponse<Transaction>> {
    return this.http.post<ApiResponse<Transaction>>("/grow/payments/refund", params);
  }

  async listTransactions(params?: ListTransactionsParams): Promise<PaginatedResponse<Transaction>> {
    return this.http.get<PaginatedResponse<Transaction>>("/grow/payments/transactions", params as Record<string, unknown>);
  }

  async getTransaction(id: string): Promise<ApiResponse<Transaction>> {
    return this.http.get<ApiResponse<Transaction>>(`/grow/payments/transactions/${id}`);
  }
}
