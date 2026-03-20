// src/types/files.ts
import type { PaginationParams } from "./shared";

export interface GlanceFile {
  visibleId: string;
  name: string;
  type: string;
  size: number;
  remoteUrl?: string;
  createdAt?: string;
}

export interface ListFilesParams extends PaginationParams {
  entityType?: string;
  entityId?: number;
}
