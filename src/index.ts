// src/index.ts

// Client
export { GlanceClient } from "./client";
export type { GlanceClientOptions, ApiResponse, PaginatedResponse, PaginationMeta, RequestOptions } from "./core/types";

// Errors
export { GlanceError, GlanceApiError, GlanceAuthenticationError, GlanceNotFoundError, GlanceValidationError, GlanceRateLimitError } from "./core/errors";

// Pagination
export { toPageResult } from "./core/pagination";
export type { PageResult } from "./core/pagination";

// Shared enums & types
export type {
  ClientType, PaymentTermType, DocumentType, PurchaseDocumentType,
  PaymentMethod, CustomFieldType, CustomFieldEntityType, EmployeeRole,
  SerialStatus, RetainerFrequency, RetainerDocumentType, PaginationParams, DateRange,
} from "./types/shared";

// Resource types
export type { Client, CreateClientParams, UpdateClientParams, ListClientsParams } from "./types/clients";
export type { Contact, CreateContactParams, UpdateContactParams, ListContactsParams } from "./types/contacts";
export type { Address, CreateAddressParams, UpdateAddressParams, ListAddressesParams } from "./types/addresses";
export type { Product, CreateProductParams, UpdateProductParams, ListProductsParams } from "./types/products";
export type { ProductSerial, CreateProductSerialsParams, UpdateProductSerialParams } from "./types/product-serials";
export type { Warehouse, CreateWarehouseParams, UpdateWarehouseParams, ListWarehousesParams } from "./types/warehouses";
export type { Inventory, CreateInventoryParams, UpdateInventoryParams, AdjustInventoryParams, ListInventoryParams } from "./types/inventory";
export type { InventoryMovement, CreateInventoryMovementParams, ListInventoryMovementsParams } from "./types/inventory-movements";
export type { GlanceDocument, DocumentProduct, DocumentPayment, CreateDocumentParams, UpdateDocumentParams, ListDocumentsParams, AllocateReceiptParams } from "./types/documents";
export type { Vendor, CreateVendorParams, UpdateVendorParams, ListVendorsParams } from "./types/vendors";
export type { PurchaseDocument, CreatePurchaseDocumentParams, ListPurchaseDocumentsParams } from "./types/purchase";
export type { Expense, CreateExpenseParams, UpdateExpenseParams, ListExpensesParams } from "./types/expenses";
export type { Retainer, CreateRetainerParams, UpdateRetainerParams, ListRetainersParams } from "./types/retainers";
export type { IncomeReportParams, ExpensesReportParams, DocumentsReportParams, MaamReportParams, ReportResponse } from "./types/reports";
export type { Employee, CreateEmployeeParams, UpdateEmployeeParams, ListEmployeesParams } from "./types/employees";
export type { GlanceFile, ListFilesParams } from "./types/files";
export type { CustomField, CreateCustomFieldParams, UpdateCustomFieldParams, CustomFieldValue, SetCustomFieldValuesParams } from "./types/custom-fields";
export type { Transaction, ChargeParams, RefundParams, ListTransactionsParams } from "./types/payments";
export type { Settings } from "./types/settings";
