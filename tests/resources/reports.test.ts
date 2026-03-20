// tests/resources/reports.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ReportsResource } from "../../src/resources/reports";
import { createMockHttp } from "../helpers";
import type { HttpClient } from "../../src/core/http";

describe("ReportsResource", () => {
  let http: HttpClient;
  let reports: ReportsResource;

  beforeEach(() => {
    http = createMockHttp();
    reports = new ReportsResource(http);
  });

  it("income() calls POST /reports/income", async () => {
    vi.mocked(http.post).mockResolvedValue({ success: true, data: { total: 1000, months: [] } });
    await reports.income({ startDate: "2026-01-01", endDate: "2026-03-01" });
    expect(http.post).toHaveBeenCalledWith("/reports/income", { startDate: "2026-01-01", endDate: "2026-03-01" });
  });

  it("expenses() calls POST /reports/expenses", async () => {
    vi.mocked(http.post).mockResolvedValue({ success: true, data: { total: 500, months: [] } });
    await reports.expenses({ startDate: "2026-01-01", endDate: "2026-03-01" });
    expect(http.post).toHaveBeenCalledWith("/reports/expenses", { startDate: "2026-01-01", endDate: "2026-03-01" });
  });

  it("documents() calls POST /reports/documents", async () => {
    vi.mocked(http.post).mockResolvedValue({ success: true, data: { total: 50, months: [] } });
    await reports.documents({ startDate: "2026-01-01", endDate: "2026-03-01", type: "invoice" });
    expect(http.post).toHaveBeenCalledWith("/reports/documents", { startDate: "2026-01-01", endDate: "2026-03-01", type: "invoice" });
  });

  it("maam() calls POST /reports/maam", async () => {
    vi.mocked(http.post).mockResolvedValue({ success: true, data: { total: 170, months: [] } });
    await reports.maam({ startDate: "2026-01-01", endDate: "2026-03-01" });
    expect(http.post).toHaveBeenCalledWith("/reports/maam", { startDate: "2026-01-01", endDate: "2026-03-01" });
  });
});
