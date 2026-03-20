// src/types/shared.ts

export type ClientType = "MURSHE" | "COMPANY" | "PATOOR";
export type PaymentTermType = "CURRENT_PLUS_DAYS" | "DAYS_ONLY";

export type DocumentType =
  | "quotation" | "order" | "delivery" | "return"
  | "invoice" | "invoiceReceipt" | "refund" | "bill" | "receipt";

export type PurchaseDocumentType = "purchaseOrder" | "purchaseReceipt" | "supplierInvoice";
export type PaymentMethod = "cash" | "check" | "creditCard" | "bankTransfer" | "giftCard" | "replacement" | "note" | "other";
export type CustomFieldType = "text" | "number" | "date" | "select" | "boolean";
export type CustomFieldEntityType = "client" | "product" | "document";
export type EmployeeRole = "owner" | "manager" | "shift_manager" | "employee";
export type SerialStatus = "IN_STOCK" | "SOLD" | "RESERVED" | "RETURNED";
export type RetainerFrequency = "monthly" | "quarterly" | "yearly";
export type RetainerDocumentType = "invoice" | "invoiceReceipt";

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}
