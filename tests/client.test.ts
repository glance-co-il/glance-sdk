// tests/client.test.ts
import { describe, it, expect } from "vitest";
import { GlanceClient } from "../src/client";

describe("GlanceClient", () => {
  it("exposes all resource namespaces", () => {
    const client = new GlanceClient({ apiKey: "test-key" });

    expect(client.clients).toBeDefined();
    expect(client.contacts).toBeDefined();
    expect(client.addresses).toBeDefined();
    expect(client.products).toBeDefined();
    expect(client.productSerials).toBeDefined();
    expect(client.warehouses).toBeDefined();
    expect(client.inventory).toBeDefined();
    expect(client.inventoryMovements).toBeDefined();
    expect(client.documents).toBeDefined();
    expect(client.vendors).toBeDefined();
    expect(client.purchase).toBeDefined();
    expect(client.expenses).toBeDefined();
    expect(client.retainers).toBeDefined();
    expect(client.reports).toBeDefined();
    expect(client.employees).toBeDefined();
    expect(client.files).toBeDefined();
    expect(client.customFields).toBeDefined();
    expect(client.payments).toBeDefined();
    expect(client.settings).toBeDefined();
  });

  it("requires apiKey", () => {
    expect(() => new GlanceClient({ apiKey: "" })).toThrow("apiKey is required");
  });

  it("accepts custom baseUrl", () => {
    const client = new GlanceClient({ apiKey: "key", baseUrl: "https://custom.api.com" });
    expect(client).toBeDefined();
  });
});
