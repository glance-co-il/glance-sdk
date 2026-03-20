// src/resources/reports.ts
import { BaseResource } from "./base";
import type { ApiResponse } from "../core/types";
import type {
  IncomeReportParams, ExpensesReportParams,
  DocumentsReportParams, MaamReportParams, ReportResponse,
} from "../types/reports";

export class ReportsResource extends BaseResource {
  async income(params: IncomeReportParams): Promise<ApiResponse<ReportResponse>> {
    return this.http.post<ApiResponse<ReportResponse>>("/reports/income", params);
  }

  async expenses(params: ExpensesReportParams): Promise<ApiResponse<ReportResponse>> {
    return this.http.post<ApiResponse<ReportResponse>>("/reports/expenses", params);
  }

  async documents(params: DocumentsReportParams): Promise<ApiResponse<ReportResponse>> {
    return this.http.post<ApiResponse<ReportResponse>>("/reports/documents", params);
  }

  async maam(params: MaamReportParams): Promise<ApiResponse<ReportResponse>> {
    return this.http.post<ApiResponse<ReportResponse>>("/reports/maam", params);
  }
}
