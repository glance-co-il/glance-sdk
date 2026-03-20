// tests/resources/warehouses.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { WarehousesResource } from "../../src/resources/warehouses";
import { createMockHttp } from "../helpers";
import type { HttpClient } from "../../src/core/http";

describe("WarehousesResource", () => {
  let http: HttpClient;
  let warehouses: WarehousesResource;

  beforeEach(() => {
    http = createMockHttp();
    warehouses = new WarehousesResource(http);
  });

  it("list() calls GET /warehouses", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: [] });
    await warehouses.list();
    expect(http.get).toHaveBeenCalledWith("/warehouses", undefined);
  });

  it("get() calls GET /warehouses/:id", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: { id: 1 } });
    await warehouses.get(1);
    expect(http.get).toHaveBeenCalledWith("/warehouses/1");
  });

  it("create() calls POST /warehouses", async () => {
    vi.mocked(http.post).mockResolvedValue({ success: true, data: {} });
    await warehouses.create({ name: "Main Warehouse" });
    expect(http.post).toHaveBeenCalledWith("/warehouses", { name: "Main Warehouse" });
  });

  it("update() calls PUT /warehouses/:id", async () => {
    vi.mocked(http.put).mockResolvedValue({ success: true, data: {} });
    await warehouses.update(1, { name: "Updated" });
    expect(http.put).toHaveBeenCalledWith("/warehouses/1", { name: "Updated" });
  });

  it("delete() calls DELETE /warehouses/:id", async () => {
    vi.mocked(http.delete).mockResolvedValue({ success: true, data: null });
    await warehouses.delete(1);
    expect(http.delete).toHaveBeenCalledWith("/warehouses/1");
  });
});
