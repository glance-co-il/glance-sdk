// tests/resources/files.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { FilesResource } from "../../src/resources/files";
import { createMockHttp } from "../helpers";
import type { HttpClient } from "../../src/core/http";

describe("FilesResource", () => {
  let http: HttpClient;
  let files: FilesResource;

  beforeEach(() => {
    http = createMockHttp();
    files = new FilesResource(http);
  });

  it("list() calls GET /files", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: [], pagination: { total: 0, limit: 50, offset: 0, hasMore: false } });
    await files.list({ entityType: "expense" });
    expect(http.get).toHaveBeenCalledWith("/files", { entityType: "expense" });
  });

  it("get() calls GET /files/file/:visibleId", async () => {
    vi.mocked(http.get).mockResolvedValue({ success: true, data: { visibleId: "F-001" } });
    await files.get("F-001");
    expect(http.get).toHaveBeenCalledWith("/files/file/F-001");
  });
});
