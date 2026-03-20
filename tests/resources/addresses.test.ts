// tests/resources/addresses.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AddressesResource } from "../../src/resources/addresses";
import { createMockHttp } from "../helpers";
import type { HttpClient } from "../../src/core/http";

describe("AddressesResource", () => {
  let http: HttpClient;
  let addresses: AddressesResource;

  beforeEach(() => {
    http = createMockHttp();
    addresses = new AddressesResource(http);
  });

  it("list() calls GET /addresses", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: [], pagination: { total: 0, limit: 50, offset: 0, hasMore: false } });
    await addresses.list();
    expect(http.get).toHaveBeenCalledWith("/addresses", undefined);
  });

  it("get() calls GET /addresses/id/:id", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: { id: 1 } });
    await addresses.get(1);
    expect(http.get).toHaveBeenCalledWith("/addresses/id/1");
  });

  it("create() calls POST /addresses/create", async () => {
    vi.mocked(http.post).mockResolvedValue({ success: true, data: {} });
    await addresses.create({ street: "Main St", city: "TLV" });
    expect(http.post).toHaveBeenCalledWith("/addresses/create", { street: "Main St", city: "TLV" });
  });

  it("update() calls PUT /addresses/:id", async () => {
    vi.mocked(http.put).mockResolvedValue({ success: true, data: {} });
    await addresses.update(1, { city: "Haifa" });
    expect(http.put).toHaveBeenCalledWith("/addresses/1", { city: "Haifa" });
  });

  it("delete() calls DELETE /addresses/:id", async () => {
    vi.mocked(http.delete).mockResolvedValue({ success: true, data: null });
    await addresses.delete(1);
    expect(http.delete).toHaveBeenCalledWith("/addresses/1");
  });
});
