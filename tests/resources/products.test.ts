// tests/resources/products.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProductsResource } from "../../src/resources/products";
import { createMockHttp } from "../helpers";
import type { HttpClient } from "../../src/core/http";

describe("ProductsResource", () => {
  let http: HttpClient;
  let products: ProductsResource;

  beforeEach(() => {
    http = createMockHttp();
    products = new ProductsResource(http);
  });

  it("list() calls GET /products", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: [], pagination: { total: 0, limit: 50, offset: 0, hasMore: false } });
    await products.list({ search: "widget", isPhysical: true });
    expect(http.get).toHaveBeenCalledWith("/products", { search: "widget", isPhysical: true });
  });

  it("get() calls GET /products/id/:id", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: { id: 1 } });
    await products.get(1);
    expect(http.get).toHaveBeenCalledWith("/products/id/1");
  });

  it("getBySku() calls GET /products/sku/:sku", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: { sku: "WDG-001" } });
    await products.getBySku("WDG-001");
    expect(http.get).toHaveBeenCalledWith("/products/sku/WDG-001");
  });

  it("create() calls POST /products/create", async () => {
    vi.mocked(http.post).mockResolvedValue({ success: true, data: {} });
    await products.create({ name: "Widget", sku: "WDG-001" });
    expect(http.post).toHaveBeenCalledWith("/products/create", { name: "Widget", sku: "WDG-001" });
  });

  it("update() calls PUT /products/edit/:id", async () => {
    vi.mocked(http.put).mockResolvedValue({ success: true, data: {} });
    await products.update(1, { name: "Updated Widget" });
    expect(http.put).toHaveBeenCalledWith("/products/edit/1", { name: "Updated Widget" });
  });

  it("delete() calls DELETE /products/delete/:id", async () => {
    vi.mocked(http.delete).mockResolvedValue({ success: true, data: null });
    await products.delete(1);
    expect(http.delete).toHaveBeenCalledWith("/products/delete/1");
  });
});
