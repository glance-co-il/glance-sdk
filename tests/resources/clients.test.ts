// tests/resources/clients.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ClientsResource } from "../../src/resources/clients";
import { createMockHttp } from "../helpers";
import type { HttpClient } from "../../src/core/http";

describe("ClientsResource", () => {
  let http: HttpClient;
  let clients: ClientsResource;

  beforeEach(() => {
    http = createMockHttp();
    clients = new ClientsResource(http);
  });

  it("list() calls GET /clients with query params", async () => {
    const response = { success: true, data: [], pagination: { total: 0, limit: 50, offset: 0, hasMore: false } };
    vi.mocked(http.get).mockResolvedValue(response);

    const result = await clients.list({ search: "test", page: 1 });

    expect(http.get).toHaveBeenCalledWith("/clients", { search: "test", page: 1 });
    expect(result).toEqual(response);
  });

  it("get() calls GET /clients/id/:visibleId", async () => {
    const response = { success: true, data: { visibleId: "C-001", name: "Test" } };
    vi.mocked(http.get).mockResolvedValue(response);

    const result = await clients.get("C-001");

    expect(http.get).toHaveBeenCalledWith("/clients/id/C-001");
    expect(result).toEqual(response);
  });

  it("create() calls POST /clients/create with body", async () => {
    const body = { name: "New Client" };
    const response = { success: true, data: { visibleId: "C-002", name: "New Client" } };
    vi.mocked(http.post).mockResolvedValue(response);

    const result = await clients.create(body);

    expect(http.post).toHaveBeenCalledWith("/clients/create", body);
    expect(result).toEqual(response);
  });

  it("update() calls PUT /clients/edit/:visibleId with body", async () => {
    const body = { name: "Updated" };
    const response = { success: true, data: { visibleId: "C-001", name: "Updated" } };
    vi.mocked(http.put).mockResolvedValue(response);

    const result = await clients.update("C-001", body);

    expect(http.put).toHaveBeenCalledWith("/clients/edit/C-001", body);
    expect(result).toEqual(response);
  });
});
