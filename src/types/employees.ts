// src/types/employees.ts
import type { EmployeeRole, PaginationParams } from "./shared";

export interface Employee {
  visibleId: string;
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  role?: EmployeeRole;
  groupIds?: number[];
  createdAt?: string;
}

export interface CreateEmployeeParams {
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  role?: EmployeeRole;
  groupIds?: number[];
}

export type UpdateEmployeeParams = Partial<CreateEmployeeParams>;

export interface ListEmployeesParams extends PaginationParams {
  search?: string;
}
