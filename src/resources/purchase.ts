// src/resources/purchase.ts
import { BaseResource } from "./base";
import type { ApiResponse, PaginatedResponse } from "../core/types";
import type { PurchaseDocumentType } from "../types/shared";
import type {
  PurchaseDocument, CreatePurchaseDocumentParams, ListPurchaseDocumentsParams,
} from "../types/purchase";

export class PurchaseResource extends BaseResource {
  async list(params?: ListPurchaseDocumentsParams): Promise<PaginatedResponse<PurchaseDocument>> {
    return this.http.get<PaginatedResponse<PurchaseDocument>>("/purchase", params as Record<string, unknown>);
  }

  async get(visibleId: string): Promise<ApiResponse<PurchaseDocument>> {
    return this.http.get<ApiResponse<PurchaseDocument>>(`/purchase/id/${visibleId}`);
  }

  async create(type: PurchaseDocumentType, params: CreatePurchaseDocumentParams): Promise<ApiResponse<PurchaseDocument>> {
    return this.http.post<ApiResponse<PurchaseDocument>>(`/purchase/create/${type}`, params);
  }

  async close(visibleId: string): Promise<ApiResponse<PurchaseDocument>> {
    return this.http.post<ApiResponse<PurchaseDocument>>(`/purchase/close/${visibleId}`);
  }

  async getSettings(route: string): Promise<ApiResponse<unknown>> {
    return this.http.get<ApiResponse<unknown>>(`/purchase/settings/${route}`);
  }
}
