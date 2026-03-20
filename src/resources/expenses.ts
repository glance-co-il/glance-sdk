// src/resources/expenses.ts
import { BaseResource } from "./base";
import type { ApiResponse, PaginatedResponse } from "../core/types";
import type { Expense, CreateExpenseParams, UpdateExpenseParams, ListExpensesParams } from "../types/expenses";

export class ExpensesResource extends BaseResource {
  async list(params?: ListExpensesParams): Promise<PaginatedResponse<Expense>> {
    return this.http.get<PaginatedResponse<Expense>>("/expenses", params as Record<string, unknown>);
  }

  async get(id: number): Promise<ApiResponse<Expense>> {
    return this.http.get<ApiResponse<Expense>>(`/expenses/id/${id}`);
  }

  async create(params: CreateExpenseParams): Promise<ApiResponse<Expense>> {
    return this.http.post<ApiResponse<Expense>>("/expenses/create", params);
  }

  async update(id: number, params: UpdateExpenseParams): Promise<ApiResponse<Expense>> {
    return this.http.put<ApiResponse<Expense>>(`/expenses/edit/${id}`, params);
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`/expenses/delete/${id}`);
  }
}
