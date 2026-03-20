// src/types/retainers.ts
import type { RetainerFrequency, RetainerDocumentType, PaginationParams } from "./shared";
import type { DocumentProduct } from "./documents";

export interface Retainer {
  id: number;
  visibleId: string;
  clientId: string;
  amount: number;
  frequency: RetainerFrequency;
  documentType: RetainerDocumentType;
  startDate: string;
  endDate?: string;
  products?: DocumentProduct[];
  isActive?: boolean;
  nextRunDate?: string;
  runsCount?: number;
  createdAt?: string;
}

export interface CreateRetainerParams {
  clientId: string;
  amount: number;
  frequency: RetainerFrequency;
  documentType: RetainerDocumentType;
  startDate: string;
  endDate?: string;
  products: DocumentProduct[];
  notes?: string;
}

export type UpdateRetainerParams = Partial<CreateRetainerParams>;
export type ListRetainersParams = PaginationParams;
