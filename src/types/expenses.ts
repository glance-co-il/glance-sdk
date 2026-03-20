// src/types/expenses.ts
import type { PaginationParams } from "./shared";

export interface Expense {
  id: number;
  vendorId: number;
  fileId?: number;
  title?: string;
  notes?: string;
  date: string;
  documentNumber?: string;
  currency?: string;
  total: number;
  tax: number;
  deductableTax: number;
  isEquipment?: boolean;
  createdAt?: string;
}

export interface CreateExpenseParams {
  vendorId: number;
  fileId: number;
  date: string;
  total: number;
  tax: number;
  deductableTax: number;
  title?: string;
  notes?: string;
  documentNumber?: string;
  currency?: string;
  isEquipment?: boolean;
}

export type UpdateExpenseParams = Partial<CreateExpenseParams>;

export interface ListExpensesParams extends PaginationParams {
  search?: string;
}
