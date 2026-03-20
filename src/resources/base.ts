// src/resources/base.ts
import type { HttpClient } from "../core/http";

export abstract class BaseResource {
  constructor(protected readonly http: HttpClient) {}
}
