// tests/resources/employees.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { EmployeesResource } from "../../src/resources/employees";
import { createMockHttp } from "../helpers";
import type { HttpClient } from "../../src/core/http";

describe("EmployeesResource", () => {
  let http: HttpClient;
  let employees: EmployeesResource;

  beforeEach(() => {
    http = createMockHttp();
    employees = new EmployeesResource(http);
  });

  it("list() calls GET /employees", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: [], pagination: { total: 0, limit: 50, offset: 0, hasMore: false } });
    await employees.list({ search: "john" });
    expect(http.get).toHaveBeenCalledWith("/employees", { search: "john" });
  });

  it("get() calls GET /employees/id/:visibleId", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: { visibleId: "EMP-001" } });
    await employees.get("EMP-001");
    expect(http.get).toHaveBeenCalledWith("/employees/id/EMP-001");
  });

  it("create() calls POST /employees/create", async () => {
    vi.mocked(http.post).mockResolvedValue({ success: true, data: {} });
    await employees.create({ firstName: "John", email: "john@example.com" });
    expect(http.post).toHaveBeenCalledWith("/employees/create", { firstName: "John", email: "john@example.com" });
  });

  it("update() calls PUT /employees/edit/:visibleId", async () => {
    vi.mocked(http.put).mockResolvedValue({ success: true, data: {} });
    await employees.update("EMP-001", { role: "manager" });
    expect(http.put).toHaveBeenCalledWith("/employees/edit/EMP-001", { role: "manager" });
  });

  it("delete() calls DELETE /employees/:visibleId", async () => {
    vi.mocked(http.delete).mockResolvedValue({ success: true, data: null });
    await employees.delete("EMP-001");
    expect(http.delete).toHaveBeenCalledWith("/employees/EMP-001");
  });
});
