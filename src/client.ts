// src/client.ts
import { HttpClient } from "./core/http";
import type { GlanceClientOptions } from "./core/types";
import { ClientsResource } from "./resources/clients";
import { ContactsResource } from "./resources/contacts";
import { AddressesResource } from "./resources/addresses";
import { ProductsResource } from "./resources/products";
import { ProductSerialsResource } from "./resources/product-serials";
import { WarehousesResource } from "./resources/warehouses";
import { InventoryResource } from "./resources/inventory";
import { InventoryMovementsResource } from "./resources/inventory-movements";
import { DocumentsResource } from "./resources/documents";
import { VendorsResource } from "./resources/vendors";
import { PurchaseResource } from "./resources/purchase";
import { ExpensesResource } from "./resources/expenses";
import { RetainersResource } from "./resources/retainers";
import { ReportsResource } from "./resources/reports";
import { EmployeesResource } from "./resources/employees";
import { FilesResource } from "./resources/files";
import { CustomFieldsResource } from "./resources/custom-fields";
import { PaymentsResource } from "./resources/payments";
import { SettingsResource } from "./resources/settings";

export class GlanceClient {
  readonly clients: ClientsResource;
  readonly contacts: ContactsResource;
  readonly addresses: AddressesResource;
  readonly products: ProductsResource;
  readonly productSerials: ProductSerialsResource;
  readonly warehouses: WarehousesResource;
  readonly inventory: InventoryResource;
  readonly inventoryMovements: InventoryMovementsResource;
  readonly documents: DocumentsResource;
  readonly vendors: VendorsResource;
  readonly purchase: PurchaseResource;
  readonly expenses: ExpensesResource;
  readonly retainers: RetainersResource;
  readonly reports: ReportsResource;
  readonly employees: EmployeesResource;
  readonly files: FilesResource;
  readonly customFields: CustomFieldsResource;
  readonly payments: PaymentsResource;
  readonly settings: SettingsResource;

  constructor(options: GlanceClientOptions) {
    if (!options.apiKey) {
      throw new Error("apiKey is required");
    }

    const http = new HttpClient(options);

    this.clients = new ClientsResource(http);
    this.contacts = new ContactsResource(http);
    this.addresses = new AddressesResource(http);
    this.products = new ProductsResource(http);
    this.productSerials = new ProductSerialsResource(http);
    this.warehouses = new WarehousesResource(http);
    this.inventory = new InventoryResource(http);
    this.inventoryMovements = new InventoryMovementsResource(http);
    this.documents = new DocumentsResource(http);
    this.vendors = new VendorsResource(http);
    this.purchase = new PurchaseResource(http);
    this.expenses = new ExpensesResource(http);
    this.retainers = new RetainersResource(http);
    this.reports = new ReportsResource(http);
    this.employees = new EmployeesResource(http);
    this.files = new FilesResource(http);
    this.customFields = new CustomFieldsResource(http);
    this.payments = new PaymentsResource(http);
    this.settings = new SettingsResource(http);
  }
}
