import type { PaginatedResponse, PaginationMeta } from "./types";

export interface PageResult<T> {
  data: T[];
  pagination: PaginationMeta;
  hasMore: boolean;
}

export function toPageResult<T>(response: PaginatedResponse<T>): PageResult<T> {
  return {
    data: response.data,
    pagination: response.pagination,
    hasMore: response.pagination.hasMore,
  };
}
