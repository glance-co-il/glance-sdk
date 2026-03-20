// tests/resources/expenses.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ExpensesResource } from "../../src/resources/expenses";
import { createMockHttp } from "../helpers";
import type { HttpClient } from "../../src/core/http";

describe("ExpensesResource", () => {
  let http: HttpClient;
  let expenses: ExpensesResource;

  beforeEach(() => {
    http = createMockHttp();
    expenses = new ExpensesResource(http);
  });

  it("list() calls GET /expenses", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: [], pagination: { total: 0, limit: 50, offset: 0, hasMore: false } });
    await expenses.list({ search: "office" });
    expect(http.get).toHaveBeenCalledWith("/expenses", { search: "office" });
  });

  it("get() calls GET /expenses/id/:id", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: { id: 1 } });
    await expenses.get(1);
    expect(http.get).toHaveBeenCalledWith("/expenses/id/1");
  });

  it("create() calls POST /expenses/create", async () => {
    const params = { vendorId: 1, fileId: 1, date: "2026-01-01", total: 100, tax: 17, deductableTax: 17 };
    vi.mocked(http.post).mockResolvedValue({ success: true, data: {} });
    await expenses.create(params);
    expect(http.post).toHaveBeenCalledWith("/expenses/create", params);
  });

  it("update() calls PUT /expenses/edit/:id", async () => {
    vi.mocked(http.put).mockResolvedValue({ success: true, data: {} });
    await expenses.update(1, { title: "Updated" });
    expect(http.put).toHaveBeenCalledWith("/expenses/edit/1", { title: "Updated" });
  });

  it("delete() calls DELETE /expenses/delete/:id", async () => {
    vi.mocked(http.delete).mockResolvedValue({ success: true, data: null });
    await expenses.delete(1);
    expect(http.delete).toHaveBeenCalledWith("/expenses/delete/1");
  });
});
