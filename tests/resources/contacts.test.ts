// tests/resources/contacts.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ContactsResource } from "../../src/resources/contacts";
import { createMockHttp } from "../helpers";
import type { HttpClient } from "../../src/core/http";

describe("ContactsResource", () => {
  let http: HttpClient;
  let contacts: ContactsResource;

  beforeEach(() => {
    http = createMockHttp();
    contacts = new ContactsResource(http);
  });

  it("list() calls GET /contacts", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: [], pagination: { total: 0, limit: 50, offset: 0, hasMore: false } });
    await contacts.list({ search: "john" });
    expect(http.get).toHaveBeenCalledWith("/contacts", { search: "john" });
  });

  it("get() calls GET /contacts/id/:visibleId", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: { visibleId: "CON-1" } });
    await contacts.get("CON-1");
    expect(http.get).toHaveBeenCalledWith("/contacts/id/CON-1");
  });

  it("create() calls POST /contacts/create", async () => {
    vi.mocked(http.post).mockResolvedValue({ success: true, data: {} });
    await contacts.create({ firstName: "John" });
    expect(http.post).toHaveBeenCalledWith("/contacts/create", { firstName: "John" });
  });

  it("update() calls PUT /contacts/edit/:visibleId", async () => {
    vi.mocked(http.put).mockResolvedValue({ success: true, data: {} });
    await contacts.update("CON-1", { lastName: "Doe" });
    expect(http.put).toHaveBeenCalledWith("/contacts/edit/CON-1", { lastName: "Doe" });
  });

  it("delete() calls DELETE /contacts/delete/:visibleId", async () => {
    vi.mocked(http.delete).mockResolvedValue({ success: true, data: null });
    await contacts.delete("CON-1");
    expect(http.delete).toHaveBeenCalledWith("/contacts/delete/CON-1");
  });
});
