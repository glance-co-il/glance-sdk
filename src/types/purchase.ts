// src/types/purchase.ts
import type { PurchaseDocumentType, PaginationParams } from "./shared";
import type { DocumentProduct } from "./documents";

export interface PurchaseDocument {
  visibleId: string;
  type: PurchaseDocumentType;
  vendorId?: string;
  title?: string;
  products?: DocumentProduct[];
  date?: string;
  tax?: number;
  notes?: string;
  amount?: number;
  totalWithTax?: number;
  relatedDocuments?: string[];
  createdAt?: string;
}

export interface CreatePurchaseDocumentParams {
  vendorId: string;
  title?: string;
  products: DocumentProduct[];
  date?: string;
  tax?: number;
  notes?: string;
  relatedDocuments?: string[];
}

export interface ListPurchaseDocumentsParams extends PaginationParams {
  type?: PurchaseDocumentType;
}
