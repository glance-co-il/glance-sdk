// tests/resources/retainers.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { RetainersResource } from "../../src/resources/retainers";
import { createMockHttp } from "../helpers";
import type { HttpClient } from "../../src/core/http";

describe("RetainersResource", () => {
  let http: HttpClient;
  let retainers: RetainersResource;

  beforeEach(() => {
    http = createMockHttp();
    retainers = new RetainersResource(http);
  });

  it("list() calls GET /retainers", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: [], pagination: { total: 0, limit: 50, offset: 0, hasMore: false } });
    await retainers.list();
    expect(http.get).toHaveBeenCalledWith("/retainers", undefined);
  });

  it("get() calls GET /retainers/:id", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: { id: 1 } });
    await retainers.get("R-001");
    expect(http.get).toHaveBeenCalledWith("/retainers/R-001");
  });

  it("create() calls POST /retainers/create", async () => {
    const params = {
      clientId: "C-001", amount: 500, frequency: "monthly" as const,
      documentType: "invoice" as const, startDate: "2026-01-01",
      products: [{ description: "Monthly Service", units: 1, price: 500 }],
    };
    vi.mocked(http.post).mockResolvedValue({ success: true, data: {} });
    await retainers.create(params);
    expect(http.post).toHaveBeenCalledWith("/retainers/create", params);
  });

  it("update() calls PUT /retainers/:id", async () => {
    vi.mocked(http.put).mockResolvedValue({ success: true, data: {} });
    await retainers.update("R-001", { amount: 600 });
    expect(http.put).toHaveBeenCalledWith("/retainers/R-001", { amount: 600 });
  });

  it("delete() calls DELETE /retainers/:id", async () => {
    vi.mocked(http.delete).mockResolvedValue({ success: true, data: null });
    await retainers.delete("R-001");
    expect(http.delete).toHaveBeenCalledWith("/retainers/R-001");
  });

  it("reactivate() calls POST /retainers/reactivate/:id", async () => {
    vi.mocked(http.post).mockResolvedValue({ success: true, data: {} });
    await retainers.reactivate("R-001");
    expect(http.post).toHaveBeenCalledWith("/retainers/reactivate/R-001");
  });
});
