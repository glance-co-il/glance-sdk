// tests/resources/purchase.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { PurchaseResource } from "../../src/resources/purchase";
import { createMockHttp } from "../helpers";
import type { HttpClient } from "../../src/core/http";

describe("PurchaseResource", () => {
  let http: HttpClient;
  let purchase: PurchaseResource;

  beforeEach(() => {
    http = createMockHttp();
    purchase = new PurchaseResource(http);
  });

  it("list() calls GET /purchase", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: [], pagination: { total: 0, limit: 50, offset: 0, hasMore: false } });
    await purchase.list({ type: "purchaseOrder" });
    expect(http.get).toHaveBeenCalledWith("/purchase", { type: "purchaseOrder" });
  });

  it("get() calls GET /purchase/id/:visibleId", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: { visibleId: "PO-001" } });
    await purchase.get("PO-001");
    expect(http.get).toHaveBeenCalledWith("/purchase/id/PO-001");
  });

  it("create() calls POST /purchase/create/:type", async () => {
    const params = { vendorId: "V-001", products: [{ description: "Parts", units: 100, price: 5 }] };
    vi.mocked(http.post).mockResolvedValue({ success: true, data: {} });
    await purchase.create("purchaseOrder", params);
    expect(http.post).toHaveBeenCalledWith("/purchase/create/purchaseOrder", params);
  });

  it("close() calls POST /purchase/close/:visibleId", async () => {
    vi.mocked(http.post).mockResolvedValue({ success: true, data: {} });
    await purchase.close("PO-001");
    expect(http.post).toHaveBeenCalledWith("/purchase/close/PO-001");
  });

  it("getSettings() calls GET /purchase/settings/:route", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: {} });
    await purchase.getSettings("purchaseOrder");
    expect(http.get).toHaveBeenCalledWith("/purchase/settings/purchaseOrder");
  });
});
