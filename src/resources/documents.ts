// src/resources/documents.ts
import { BaseResource } from "./base";
import type { ApiResponse, PaginatedResponse } from "../core/types";
import type { DocumentType } from "../types/shared";
import type {
  GlanceDocument, CreateDocumentParams, UpdateDocumentParams,
  ListDocumentsParams, AllocateReceiptParams,
} from "../types/documents";

export class DocumentsResource extends BaseResource {
  async list(params?: ListDocumentsParams): Promise<PaginatedResponse<GlanceDocument>> {
    return this.http.get<PaginatedResponse<GlanceDocument>>("/documents", params as Record<string, unknown>);
  }

  async get(visibleId: string): Promise<ApiResponse<GlanceDocument>> {
    return this.http.get<ApiResponse<GlanceDocument>>(`/documents/id/${visibleId}`);
  }

  async create(type: DocumentType, params: CreateDocumentParams): Promise<ApiResponse<GlanceDocument>> {
    return this.http.post<ApiResponse<GlanceDocument>>(`/documents/create/${type}`, params);
  }

  async update(visibleId: string, params: UpdateDocumentParams): Promise<ApiResponse<GlanceDocument>> {
    return this.http.put<ApiResponse<GlanceDocument>>(`/documents/edit/${visibleId}`, params);
  }

  async close(visibleId: string): Promise<ApiResponse<GlanceDocument>> {
    return this.http.post<ApiResponse<GlanceDocument>>(`/documents/close/${visibleId}`);
  }

  async allocate(visibleId: string, params: AllocateReceiptParams): Promise<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`/documents/allocate/${visibleId}`, params);
  }

  async cancelReceipt(visibleId: string): Promise<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`/documents/cancel-receipt/${visibleId}`);
  }

  async getSettings(route: string): Promise<ApiResponse<unknown>> {
    return this.http.get<ApiResponse<unknown>>(`/documents/settings/${route}`);
  }

  async previewPdf(type: DocumentType, params: CreateDocumentParams): Promise<ApiResponse<unknown>> {
    return this.http.post<ApiResponse<unknown>>(`/documents/preview/${type}`, params);
  }

  async previewHtml(params: CreateDocumentParams): Promise<ApiResponse<unknown>> {
    return this.http.post<ApiResponse<unknown>>("/documents/preview/html", params);
  }
}
