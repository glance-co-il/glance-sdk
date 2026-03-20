// tests/resources/inventory-movements.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { InventoryMovementsResource } from "../../src/resources/inventory-movements";
import { createMockHttp } from "../helpers";
import type { HttpClient } from "../../src/core/http";

describe("InventoryMovementsResource", () => {
  let http: HttpClient;
  let movements: InventoryMovementsResource;

  beforeEach(() => {
    http = createMockHttp();
    movements = new InventoryMovementsResource(http);
  });

  it("list() calls GET /inventory/movements", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: [], pagination: { total: 0, limit: 50, offset: 0, hasMore: false } });
    await movements.list({ productId: 1 });
    expect(http.get).toHaveBeenCalledWith("/inventory/movements", { productId: 1 });
  });

  it("create() calls POST /inventory/movements/create", async () => {
    vi.mocked(http.post).mockResolvedValue({ success: true, data: {} });
    await movements.create({ productId: 1, quantity: 5, toWarehouseId: 2 });
    expect(http.post).toHaveBeenCalledWith("/inventory/movements/create", { productId: 1, quantity: 5, toWarehouseId: 2 });
  });
});
