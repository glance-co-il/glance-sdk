// tests/resources/product-serials.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProductSerialsResource } from "../../src/resources/product-serials";
import { createMockHttp } from "../helpers";
import type { HttpClient } from "../../src/core/http";

describe("ProductSerialsResource", () => {
  let http: HttpClient;
  let serials: ProductSerialsResource;

  beforeEach(() => {
    http = createMockHttp();
    serials = new ProductSerialsResource(http);
  });

  it("list() calls GET /products/id/:productId/serials", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: [] });
    await serials.list(42);
    expect(http.get).toHaveBeenCalledWith("/products/id/42/serials");
  });

  it("create() calls POST /products/id/:productId/serials", async () => {
    vi.mocked(http.post).mockResolvedValue({ success: true, data: [] });
    await serials.create(42, { serials: [{ serialNumber: "SN-001", warehouseId: 1 }] });
    expect(http.post).toHaveBeenCalledWith("/products/id/42/serials", { serials: [{ serialNumber: "SN-001", warehouseId: 1 }] });
  });

  it("update() calls PUT /products/serials/:id", async () => {
    vi.mocked(http.put).mockResolvedValue({ success: true, data: {} });
    await serials.update(10, { serialNumber: "SN-002" });
    expect(http.put).toHaveBeenCalledWith("/products/serials/10", { serialNumber: "SN-002" });
  });

  it("delete() calls DELETE /products/serials/:id", async () => {
    vi.mocked(http.delete).mockResolvedValue({ success: true, data: null });
    await serials.delete(10);
    expect(http.delete).toHaveBeenCalledWith("/products/serials/10");
  });
});
