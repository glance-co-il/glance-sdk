// tests/resources/inventory.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { InventoryResource } from "../../src/resources/inventory";
import { createMockHttp } from "../helpers";
import type { HttpClient } from "../../src/core/http";

describe("InventoryResource", () => {
  let http: HttpClient;
  let inventory: InventoryResource;

  beforeEach(() => {
    http = createMockHttp();
    inventory = new InventoryResource(http);
  });

  it("list() calls GET /inventory", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: [], pagination: { total: 0, limit: 50, offset: 0, hasMore: false } });
    await inventory.list({ warehouseId: 1 });
    expect(http.get).toHaveBeenCalledWith("/inventory", { warehouseId: 1 });
  });

  it("get() calls GET /inventory/:id", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: { id: 1 } });
    await inventory.get(1);
    expect(http.get).toHaveBeenCalledWith("/inventory/1");
  });

  it("getByProduct() calls GET /inventory/product/:productId", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: [] });
    await inventory.getByProduct(42);
    expect(http.get).toHaveBeenCalledWith("/inventory/product/42");
  });

  it("create() calls POST /inventory/create", async () => {
    vi.mocked(http.post).mockResolvedValue({ success: true, data: {} });
    await inventory.create({ productId: 1, warehouseId: 1 });
    expect(http.post).toHaveBeenCalledWith("/inventory/create", { productId: 1, warehouseId: 1 });
  });

  it("update() calls PUT /inventory/:id/edit", async () => {
    vi.mocked(http.put).mockResolvedValue({ success: true, data: {} });
    await inventory.update(1, { quantity: 100 });
    expect(http.put).toHaveBeenCalledWith("/inventory/1/edit", { quantity: 100 });
  });

  it("delete() calls DELETE /inventory/:id/delete", async () => {
    vi.mocked(http.delete).mockResolvedValue({ success: true, data: null });
    await inventory.delete(1);
    expect(http.delete).toHaveBeenCalledWith("/inventory/1/delete");
  });

  it("adjust() calls POST /inventory/adjust", async () => {
    const params = { actions: [{ productId: 1, warehouseId: 1, amount: 10, reason: "recount" }] };
    vi.mocked(http.post).mockResolvedValue({ success: true, data: null });
    await inventory.adjust(params);
    expect(http.post).toHaveBeenCalledWith("/inventory/adjust", params);
  });
});
