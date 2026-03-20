// tests/resources/custom-fields.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CustomFieldsResource } from "../../src/resources/custom-fields";
import { createMockHttp } from "../helpers";
import type { HttpClient } from "../../src/core/http";

describe("CustomFieldsResource", () => {
  let http: HttpClient;
  let fields: CustomFieldsResource;

  beforeEach(() => {
    http = createMockHttp();
    fields = new CustomFieldsResource(http);
  });

  it("list() calls GET /custom-fields", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: [] });
    await fields.list();
    expect(http.get).toHaveBeenCalledWith("/custom-fields");
  });

  it("listByType() calls GET /custom-fields/type/:entityType", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: [] });
    await fields.listByType("product");
    expect(http.get).toHaveBeenCalledWith("/custom-fields/type/product");
  });

  it("create() calls POST /custom-fields/create", async () => {
    vi.mocked(http.post).mockResolvedValue({ success: true, data: {} });
    await fields.create({ label: "Color", entityType: "product", fieldType: "select", options: ["Red", "Blue"] });
    expect(http.post).toHaveBeenCalledWith("/custom-fields/create", { label: "Color", entityType: "product", fieldType: "select", options: ["Red", "Blue"] });
  });

  it("update() calls PUT /custom-fields/edit/:id", async () => {
    vi.mocked(http.put).mockResolvedValue({ success: true, data: {} });
    await fields.update(1, { label: "Colour" });
    expect(http.put).toHaveBeenCalledWith("/custom-fields/edit/1", { label: "Colour" });
  });

  it("delete() calls DELETE /custom-fields/delete/:id", async () => {
    vi.mocked(http.delete).mockResolvedValue({ success: true, data: null });
    await fields.delete(1);
    expect(http.delete).toHaveBeenCalledWith("/custom-fields/delete/1");
  });

  it("getValues() calls GET /custom-fields/entities/:entityId", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: [] });
    await fields.getValues(42);
    expect(http.get).toHaveBeenCalledWith("/custom-fields/entities/42");
  });

  it("setValues() calls POST /custom-fields/entities/:entityId/values", async () => {
    vi.mocked(http.post).mockResolvedValue({ success: true, data: null });
    await fields.setValues(42, { values: [{ fieldId: 1, value: "Red" }] });
    expect(http.post).toHaveBeenCalledWith("/custom-fields/entities/42/values", { values: [{ fieldId: 1, value: "Red" }] });
  });
});
