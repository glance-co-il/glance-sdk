# @glance-il/sdk

Official TypeScript SDK for the [Glance](https://www.glance.co.il) API — a fully-typed, ergonomic client for invoicing, inventory, and business management.

## Installation

```bash
npm install @glance-il/sdk
```

## Quick Start

```typescript
import { GlanceClient } from "@glance-il/sdk";

const glance = new GlanceClient({
  apiKey: process.env.GLANCE_API_KEY!,
});
```

## Usage Examples

### List Clients

```typescript
const { data: clients, pagination } = await glance.clients.list({
  search: "acme",
  limit: 20,
});

console.log(`Found ${pagination.total} clients`);
clients.forEach((c) => console.log(c.name));
```

### Create an Invoice

```typescript
const { data: invoice } = await glance.documents.create("invoice", {
  clientId: "C-001",
  products: [
    {
      description: "Web Development Services",
      units: 40,
      price: 150,
      typeOfUnit: "hours",
    },
  ],
  payments: [
    {
      amount: 6000,
      paymentMethod: "bankTransfer",
    },
  ],
  sendToClient: true,
});

console.log(`Invoice ${invoice.visibleId} created — total: ${invoice.totalWithTax}`);
```

### Manage Inventory

```typescript
// Adjust inventory for a product
await glance.inventory.adjust("INV-001", {
  quantity: 50,
  warehouseId: "WH-001",
  notes: "Initial stock",
});

// List inventory movements
const { data: movements } = await glance.inventoryMovements.list({
  warehouseId: "WH-001",
  limit: 50,
});
```

### Generate Reports

```typescript
const { data: report } = await glance.reports.income({
  dateFrom: "2026-01-01",
  dateTo: "2026-03-31",
});

console.log(`Revenue: ${report.total}`);
```

## Error Handling

All API errors are typed and can be caught by class:

```typescript
import {
  GlanceClient,
  GlanceApiError,
  GlanceAuthenticationError,
  GlanceNotFoundError,
  GlanceValidationError,
  GlanceRateLimitError,
} from "@glance-il/sdk";

try {
  const { data } = await glance.clients.get("non-existent");
} catch (error) {
  if (error instanceof GlanceNotFoundError) {
    console.error("Client not found");
  } else if (error instanceof GlanceValidationError) {
    console.error("Validation failed:", error.message);
  } else if (error instanceof GlanceAuthenticationError) {
    console.error("Invalid API key");
  } else if (error instanceof GlanceRateLimitError) {
    console.error("Rate limit hit — retry after", error.retryAfter, "ms");
  } else if (error instanceof GlanceApiError) {
    console.error(`API Error ${error.status}: ${error.message} (${error.code})`);
  }
}
```

## TypeScript Support

The SDK is written in TypeScript and ships with full `.d.ts` declarations. All request and response types are exported:

```typescript
import type {
  Client,
  CreateClientParams,
  GlanceDocument,
  CreateDocumentParams,
  Product,
  PaginationMeta,
} from "@glance-il/sdk";

function processClient(client: Client): void {
  console.log(`${client.name} — ${client.email}`);
}
```

## Available Resources

| Resource | Property | Description |
|---|---|---|
| Clients | `glance.clients` | Business clients / customers |
| Contacts | `glance.contacts` | Contacts associated with clients |
| Addresses | `glance.addresses` | Addresses for clients |
| Products | `glance.products` | Products and services catalog |
| Product Serials | `glance.productSerials` | Serial numbers for physical products |
| Warehouses | `glance.warehouses` | Warehouse locations |
| Inventory | `glance.inventory` | Stock levels per product/warehouse |
| Inventory Movements | `glance.inventoryMovements` | Stock movement history |
| Documents | `glance.documents` | Invoices, receipts, quotes, and more |
| Vendors | `glance.vendors` | Suppliers and vendors |
| Purchase | `glance.purchase` | Purchase orders and vendor invoices |
| Expenses | `glance.expenses` | Business expenses |
| Retainers | `glance.retainers` | Recurring retainer agreements |
| Reports | `glance.reports` | Income, expenses, VAT reports |
| Employees | `glance.employees` | Employee management |
| Files | `glance.files` | File attachments |
| Custom Fields | `glance.customFields` | Custom metadata fields |
| Payments | `glance.payments` | Payment processing and transactions |
| Settings | `glance.settings` | Account settings |

## Configuration

```typescript
const glance = new GlanceClient({
  apiKey: "your-api-key",   // required
  baseUrl: "https://api.glance.co.il", // optional, defaults to production
  timeout: 30_000,          // optional, milliseconds (default: 30s)
});
```

## Requirements

- Node.js >= 18 (uses native `fetch`)
- TypeScript >= 5.0 (optional, works with plain JS too)

## License

MIT
