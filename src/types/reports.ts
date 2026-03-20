// src/types/reports.ts
import type { DocumentType, DateRange } from "./shared";

export type IncomeReportParams = DateRange;
export type ExpensesReportParams = DateRange;

export interface DocumentsReportParams extends DateRange {
  type?: DocumentType;
}

export type MaamReportParams = DateRange;

export interface ReportResponse {
  total: number;
  months: Array<{
    month: string;
    total: number;
  }>;
}
