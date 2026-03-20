// tests/resources/vendors.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { VendorsResource } from "../../src/resources/vendors";
import { createMockHttp } from "../helpers";
import type { HttpClient } from "../../src/core/http";

describe("VendorsResource", () => {
  let http: HttpClient;
  let vendors: VendorsResource;

  beforeEach(() => {
    http = createMockHttp();
    vendors = new VendorsResource(http);
  });

  it("list() calls GET /vendors", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: [], pagination: { total: 0, limit: 50, offset: 0, hasMore: false } });
    await vendors.list({ search: "acme" });
    expect(http.get).toHaveBeenCalledWith("/vendors", { search: "acme" });
  });

  it("get() calls GET /vendors/id/:visibleId", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: { visibleId: "V-001" } });
    await vendors.get("V-001");
    expect(http.get).toHaveBeenCalledWith("/vendors/id/V-001");
  });

  it("create() calls POST /vendors/create", async () => {
    vi.mocked(http.post).mockResolvedValue({ success: true, data: {} });
    await vendors.create({ name: "Acme Corp" });
    expect(http.post).toHaveBeenCalledWith("/vendors/create", { name: "Acme Corp" });
  });

  it("update() calls PUT /vendors/edit/:visibleId", async () => {
    vi.mocked(http.put).mockResolvedValue({ success: true, data: {} });
    await vendors.update("V-001", { email: "new@acme.com" });
    expect(http.put).toHaveBeenCalledWith("/vendors/edit/V-001", { email: "new@acme.com" });
  });
});
