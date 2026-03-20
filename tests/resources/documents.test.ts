// tests/resources/documents.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { DocumentsResource } from "../../src/resources/documents";
import { createMockHttp } from "../helpers";
import type { HttpClient } from "../../src/core/http";

describe("DocumentsResource", () => {
  let http: HttpClient;
  let docs: DocumentsResource;

  beforeEach(() => {
    http = createMockHttp();
    docs = new DocumentsResource(http);
  });

  it("list() calls GET /documents with query params", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: [], pagination: { total: 0, limit: 50, offset: 0, hasMore: false } });
    await docs.list({ type: "invoice", startDate: "2026-01-01", endDate: "2026-03-01" });
    expect(http.get).toHaveBeenCalledWith("/documents", { type: "invoice", startDate: "2026-01-01", endDate: "2026-03-01" });
  });

  it("get() calls GET /documents/id/:visibleId", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: { visibleId: "INV-001" } });
    await docs.get("INV-001");
    expect(http.get).toHaveBeenCalledWith("/documents/id/INV-001");
  });

  it("create() calls POST /documents/create/:type", async () => {
    const params = { products: [{ description: "Service", units: 1, price: 100 }] };
    vi.mocked(http.post).mockResolvedValue({ success: true, data: {} });
    await docs.create("invoice", params);
    expect(http.post).toHaveBeenCalledWith("/documents/create/invoice", params);
  });

  it("update() calls PUT /documents/edit/:visibleId", async () => {
    vi.mocked(http.put).mockResolvedValue({ success: true, data: {} });
    await docs.update("QUO-001", { title: "Updated Quote" });
    expect(http.put).toHaveBeenCalledWith("/documents/edit/QUO-001", { title: "Updated Quote" });
  });

  it("close() calls POST /documents/close/:visibleId", async () => {
    vi.mocked(http.post).mockResolvedValue({ success: true, data: {} });
    await docs.close("INV-001");
    expect(http.post).toHaveBeenCalledWith("/documents/close/INV-001");
  });

  it("allocate() calls POST /documents/allocate/:visibleId", async () => {
    vi.mocked(http.post).mockResolvedValue({ success: true, data: null });
    await docs.allocate("REC-001", { invoiceIds: ["INV-001", "INV-002"] });
    expect(http.post).toHaveBeenCalledWith("/documents/allocate/REC-001", { invoiceIds: ["INV-001", "INV-002"] });
  });

  it("cancelReceipt() calls POST /documents/cancel-receipt/:visibleId", async () => {
    vi.mocked(http.post).mockResolvedValue({ success: true, data: null });
    await docs.cancelReceipt("REC-001");
    expect(http.post).toHaveBeenCalledWith("/documents/cancel-receipt/REC-001");
  });

  it("getSettings() calls GET /documents/settings/:route", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: {} });
    await docs.getSettings("invoice");
    expect(http.get).toHaveBeenCalledWith("/documents/settings/invoice");
  });

  it("previewPdf() calls POST /documents/preview/:type", async () => {
    const params = { products: [{ description: "Item", units: 1, price: 50 }] };
    vi.mocked(http.post).mockResolvedValue({ success: true, data: {} });
    await docs.previewPdf("quotation", params);
    expect(http.post).toHaveBeenCalledWith("/documents/preview/quotation", params);
  });

  it("previewHtml() calls POST /documents/preview/html", async () => {
    const params = { products: [{ description: "Item", units: 1, price: 50 }] };
    vi.mocked(http.post).mockResolvedValue({ success: true, data: {} });
    await docs.previewHtml(params);
    expect(http.post).toHaveBeenCalledWith("/documents/preview/html", params);
  });
});
