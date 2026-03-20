// src/types/documents.ts
import type { DocumentType, PaymentMethod, PaginationParams } from "./shared";

export interface DocumentProduct {
  description: string;
  units: number;
  price: number;
  sku?: string;
  typeOfUnit?: string;
  discount?: number;
  discountOn?: "price" | "total";
  discountType?: "percentage" | "fixed";
  warehouseId?: number;
  serialNumbers?: string[];
  customFields?: Array<{
    id: number;
    value: string | number | boolean;
  }>;
}

export interface DocumentPayment {
  amount: number;
  paymentMethod?: PaymentMethod;
  date?: string;
  details?: Array<Record<string, unknown>>;
  ledgerId?: number;
}

export interface GlanceDocument {
  visibleId: string;
  type: DocumentType;
  number?: number;
  title?: string;
  date?: string;
  payBy?: string;
  clientId?: string;
  client?: Record<string, unknown>;
  products?: DocumentProduct[];
  payments?: DocumentPayment[];
  amount?: number;
  tax?: number;
  totalWithTax?: number;
  discount?: number;
  discountType?: "percentage" | "fixed";
  notes?: string;
  fileId?: number;
  relatedDocuments?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateDocumentParams {
  clientId?: string;
  client?: {
    name: string;
    taxId?: string;
    type?: string;
    email?: string;
  };
  title?: string;
  products: DocumentProduct[];
  payments?: DocumentPayment[];
  date?: string;
  payBy?: string;
  tax?: number;
  discount?: number;
  discountType?: "percentage" | "fixed";
  taxMode?: "inclusive" | "exclusive";
  notes?: string;
  withSignature?: boolean;
  relatedDocuments?: string[];
  sendToClient?: boolean;
  emailRecipients?: string[];
  skipInventoryActions?: boolean;
}

export type UpdateDocumentParams = Partial<CreateDocumentParams>;

export interface ListDocumentsParams extends PaginationParams {
  type?: DocumentType;
  startDate?: string;
  endDate?: string;
  clientId?: string;
  open?: boolean;
  sku?: string;
  search?: string;
}

export interface AllocateReceiptParams {
  invoiceIds: string[];
}
