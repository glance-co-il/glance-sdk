// src/types/custom-fields.ts
import type { CustomFieldType, CustomFieldEntityType } from "./shared";

export interface CustomField {
  id: number;
  name: string;
  type: CustomFieldType;
  entityType: CustomFieldEntityType;
  options?: string[];
  isRequired?: boolean;
  showInDocuments?: boolean;
  order?: number;
}

export interface CreateCustomFieldParams {
  label: string;
  entityType: CustomFieldEntityType;
  fieldType: CustomFieldType;
  options?: string[];
  required?: boolean;
}

export type UpdateCustomFieldParams = Partial<CreateCustomFieldParams>;

export interface CustomFieldValue {
  fieldId: number;
  value: string | number | boolean;
}

export interface SetCustomFieldValuesParams {
  values: CustomFieldValue[];
}
