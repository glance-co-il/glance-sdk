// src/resources/employees.ts
import { BaseResource } from "./base";
import type { ApiResponse, PaginatedResponse } from "../core/types";
import type { Employee, CreateEmployeeParams, UpdateEmployeeParams, ListEmployeesParams } from "../types/employees";

export class EmployeesResource extends BaseResource {
  async list(params?: ListEmployeesParams): Promise<PaginatedResponse<Employee>> {
    return this.http.get<PaginatedResponse<Employee>>("/employees", params as Record<string, unknown>);
  }

  async get(visibleId: string): Promise<ApiResponse<Employee>> {
    return this.http.get<ApiResponse<Employee>>(`/employees/id/${visibleId}`);
  }

  async create(params: CreateEmployeeParams): Promise<ApiResponse<Employee>> {
    return this.http.post<ApiResponse<Employee>>("/employees/create", params);
  }

  async update(visibleId: string, params: UpdateEmployeeParams): Promise<ApiResponse<Employee>> {
    return this.http.put<ApiResponse<Employee>>(`/employees/edit/${visibleId}`, params);
  }

  async delete(visibleId: string): Promise<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`/employees/${visibleId}`);
  }
}
