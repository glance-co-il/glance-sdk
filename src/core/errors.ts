export class GlanceError extends Error {
  override name = "GlanceError";
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class GlanceApiError extends GlanceError {
  override name = "GlanceApiError";
  constructor(
    public readonly status: number,
    message: string,
    public readonly code?: string,
  ) {
    super(message);
  }
}

export class GlanceAuthenticationError extends GlanceApiError {
  override name = "GlanceAuthenticationError";
  constructor(message: string = "Authentication failed") {
    super(401, message, "NO_ACCESS");
  }
}

export class GlanceNotFoundError extends GlanceApiError {
  override name = "GlanceNotFoundError";
  constructor(message: string = "Resource not found", code?: string) {
    super(404, message, code);
  }
}

export class GlanceValidationError extends GlanceApiError {
  override name = "GlanceValidationError";
  constructor(
    message: string = "Validation failed",
    public readonly issues?: unknown[],
  ) {
    super(400, message, "INVALID_FIELD");
  }
}

export class GlanceRateLimitError extends GlanceApiError {
  override name = "GlanceRateLimitError";
  constructor(message: string = "Rate limit exceeded") {
    super(429, message, "RATE_LIMIT_EXCEEDED");
  }
}
