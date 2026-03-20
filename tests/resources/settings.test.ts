// tests/resources/settings.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SettingsResource } from "../../src/resources/settings";
import { createMockHttp } from "../helpers";
import type { HttpClient } from "../../src/core/http";

describe("SettingsResource", () => {
  let http: HttpClient;
  let settings: SettingsResource;

  beforeEach(() => {
    http = createMockHttp();
    settings = new SettingsResource(http);
  });

  it("get() calls GET /settings", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: { companyName: "Test Co" } });
    await settings.get();
    expect(http.get).toHaveBeenCalledWith("/settings");
  });
});
