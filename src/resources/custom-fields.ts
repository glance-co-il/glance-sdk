// src/resources/custom-fields.ts
import { BaseResource } from "./base";
import type { ApiResponse } from "../core/types";
import type { CustomFieldEntityType } from "../types/shared";
import type {
  CustomField, CreateCustomFieldParams, UpdateCustomFieldParams,
  CustomFieldValue, SetCustomFieldValuesParams,
} from "../types/custom-fields";

export class CustomFieldsResource extends BaseResource {
  async list(): Promise<ApiResponse<CustomField[]>> {
    return this.http.get<ApiResponse<CustomField[]>>("/custom-fields");
  }

  async listByType(entityType: CustomFieldEntityType): Promise<ApiResponse<CustomField[]>> {
    return this.http.get<ApiResponse<CustomField[]>>(`/custom-fields/type/${entityType}`);
  }

  async create(params: CreateCustomFieldParams): Promise<ApiResponse<CustomField>> {
    return this.http.post<ApiResponse<CustomField>>("/custom-fields/create", params);
  }

  async update(id: number, params: UpdateCustomFieldParams): Promise<ApiResponse<CustomField>> {
    return this.http.put<ApiResponse<CustomField>>(`/custom-fields/edit/${id}`, params);
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`/custom-fields/delete/${id}`);
  }

  async getValues(entityId: number): Promise<ApiResponse<CustomFieldValue[]>> {
    return this.http.get<ApiResponse<CustomFieldValue[]>>(`/custom-fields/entities/${entityId}`);
  }

  async setValues(entityId: number, params: SetCustomFieldValuesParams): Promise<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`/custom-fields/entities/${entityId}/values`, params);
  }

  async getProductValues(productId: number): Promise<ApiResponse<CustomFieldValue[]>> {
    return this.http.get<ApiResponse<CustomFieldValue[]>>(`/custom-fields/products/${productId}`);
  }

  async setProductValues(productId: number, params: SetCustomFieldValuesParams): Promise<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`/custom-fields/products/${productId}/values`, params);
  }
}
