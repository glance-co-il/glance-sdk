import { describe, it, expect } from "vitest";
import {
  GlanceError, GlanceApiError, GlanceAuthenticationError,
  GlanceNotFoundError, GlanceValidationError, GlanceRateLimitError,
} from "../../src/core/errors";

describe("GlanceError", () => {
  it("is an instance of Error", () => {
    const err = new GlanceError("test");
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe("test");
    expect(err.name).toBe("GlanceError");
  });
});

describe("GlanceApiError", () => {
  it("stores status, code, and message", () => {
    const err = new GlanceApiError(400, "Bad request", "INVALID_FIELD");
    expect(err.status).toBe(400);
    expect(err.code).toBe("INVALID_FIELD");
    expect(err.message).toBe("Bad request");
    expect(err.name).toBe("GlanceApiError");
  });

  it("stores validation issues when present", () => {
    const issues = [{ path: ["name"], message: "Required" }];
    const err = new GlanceValidationError("Validation failed", issues);
    expect(err.status).toBe(400);
    expect(err.code).toBe("INVALID_FIELD");
    expect(err.issues).toEqual(issues);
  });
});

describe("GlanceAuthenticationError", () => {
  it("has status 401", () => {
    const err = new GlanceAuthenticationError("Invalid token");
    expect(err.status).toBe(401);
    expect(err.code).toBe("NO_ACCESS");
  });
});

describe("GlanceNotFoundError", () => {
  it("has status 404", () => {
    const err = new GlanceNotFoundError("Not found", "CLIENT_NOT_FOUND");
    expect(err.status).toBe(404);
    expect(err.code).toBe("CLIENT_NOT_FOUND");
  });
});

describe("GlanceRateLimitError", () => {
  it("has status 429", () => {
    const err = new GlanceRateLimitError("Too many requests");
    expect(err.status).toBe(429);
  });
});
