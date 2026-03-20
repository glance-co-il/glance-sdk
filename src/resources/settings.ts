// src/resources/settings.ts
import { BaseResource } from "./base";
import type { ApiResponse } from "../core/types";
import type { Settings } from "../types/settings";

export class SettingsResource extends BaseResource {
  async get(): Promise<ApiResponse<Settings>> {
    return this.http.get<ApiResponse<Settings>>("/settings");
  }
}
