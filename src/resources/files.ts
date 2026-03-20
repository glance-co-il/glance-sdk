// src/resources/files.ts
import { BaseResource } from "./base";
import type { ApiResponse, PaginatedResponse } from "../core/types";
import type { GlanceFile, ListFilesParams } from "../types/files";

export class FilesResource extends BaseResource {
  async list(params?: ListFilesParams): Promise<PaginatedResponse<GlanceFile>> {
    return this.http.get<PaginatedResponse<GlanceFile>>("/files", params as Record<string, unknown>);
  }

  async get(visibleId: string): Promise<ApiResponse<GlanceFile>> {
    return this.http.get<ApiResponse<GlanceFile>>(`/files/file/${visibleId}`);
  }

  // Note: file upload requires multipart/form-data — use the REST API directly
  // for uploads. FormData support may be added in a future version.
}
