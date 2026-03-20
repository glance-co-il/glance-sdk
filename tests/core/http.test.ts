import { describe, it, expect, vi } from "vitest";
import { HttpClient } from "../../src/core/http";
import { GlanceApiError, GlanceAuthenticationError, GlanceNotFoundError, GlanceValidationError } from "../../src/core/errors";
import { mockFetch } from "../helpers";

describe("HttpClient", () => {
  it("sends GET with auth header", async () => {
    const fetch = mockFetch({ success: true, data: { id: 1 } });
    const http = new HttpClient({ apiKey: "test-key", baseUrl: "https://api.example.com", fetch });
    await http.get("/clients");
    expect(fetch).toHaveBeenCalledWith(
      "https://api.example.com/clients",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({ Authorization: "Bearer test-key" }),
      }),
    );
  });

  it("sends POST with JSON body", async () => {
    const fetch = mockFetch({ success: true, data: { id: 1 } });
    const http = new HttpClient({ apiKey: "test-key", baseUrl: "https://api.example.com", fetch });
    await http.post("/clients/create", { name: "Test" });
    expect(fetch).toHaveBeenCalledWith(
      "https://api.example.com/clients/create",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ name: "Test" }),
        headers: expect.objectContaining({ "Content-Type": "application/json" }),
      }),
    );
  });

  it("appends query params to GET", async () => {
    const fetch = mockFetch({ success: true, data: [] });
    const http = new HttpClient({ apiKey: "test-key", baseUrl: "https://api.example.com", fetch });
    await http.get("/clients", { search: "foo", page: 1 });
    expect(fetch).toHaveBeenCalledWith("https://api.example.com/clients?search=foo&page=1", expect.anything());
  });

  it("strips undefined query params", async () => {
    const fetch = mockFetch({ success: true, data: [] });
    const http = new HttpClient({ apiKey: "test-key", baseUrl: "https://api.example.com", fetch });
    await http.get("/clients", { search: undefined, page: 1 });
    expect(fetch).toHaveBeenCalledWith("https://api.example.com/clients?page=1", expect.anything());
  });

  it("throws GlanceAuthenticationError on 401", async () => {
    const fetch = mockFetch({ success: false, error: { status: 401, message: "Invalid", code: "NO_ACCESS" } }, 401);
    const http = new HttpClient({ apiKey: "bad", baseUrl: "https://api.example.com", fetch });
    await expect(http.get("/clients")).rejects.toThrow(GlanceAuthenticationError);
  });

  it("throws GlanceNotFoundError on 404", async () => {
    const fetch = mockFetch({ success: false, error: { status: 404, message: "Not found", code: "CLIENT_NOT_FOUND" } }, 404);
    const http = new HttpClient({ apiKey: "key", baseUrl: "https://api.example.com", fetch });
    await expect(http.get("/clients/id/999")).rejects.toThrow(GlanceNotFoundError);
  });

  it("throws GlanceValidationError on 400 with issues", async () => {
    const fetch = mockFetch({
      success: false,
      error: { status: 400, message: "Invalid", code: "INVALID_FIELD", issues: [{ path: ["name"], message: "Required" }] },
    }, 400);
    const http = new HttpClient({ apiKey: "key", baseUrl: "https://api.example.com", fetch });
    await expect(http.post("/clients/create", {})).rejects.toThrow(GlanceValidationError);
  });

  it("throws GlanceApiError on other error status", async () => {
    const fetch = mockFetch({ success: false, error: { status: 500, message: "Server error", code: "UNKNOWN_ERROR" } }, 500);
    const http = new HttpClient({ apiKey: "key", baseUrl: "https://api.example.com", fetch });
    await expect(http.get("/clients")).rejects.toThrow(GlanceApiError);
  });

  it("returns data from successful response", async () => {
    const fetch = mockFetch({ success: true, data: { id: 1, name: "Test" } });
    const http = new HttpClient({ apiKey: "key", baseUrl: "https://api.example.com", fetch });
    const result = await http.get("/clients/id/1");
    expect(result).toEqual({ success: true, data: { id: 1, name: "Test" } });
  });
});
