import { describe, it, expect } from "vitest";
import { toPageResult } from "../../src/core/pagination";

describe("toPageResult", () => {
  it("extracts data and pagination from API response", () => {
    const response = {
      success: true as const,
      data: [{ id: 1 }, { id: 2 }],
      pagination: { total: 10, limit: 2, offset: 0, hasMore: true },
    };
    const result = toPageResult(response);
    expect(result.data).toHaveLength(2);
    expect(result.hasMore).toBe(true);
    expect(result.pagination.total).toBe(10);
  });
});
