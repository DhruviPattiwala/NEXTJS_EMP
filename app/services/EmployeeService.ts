import { api } from "./ApiClientService";
import {type Employee } from "../features/types";
export const employeeService = {
        getAll: () => api.get<Employee[]>("api/employee"),
        insert: (data: Employee) => api.post<Employee>("api/employee", data),
        edit: (id: string, data: Employee) => api.put<Employee>(`api/employee/${id}`, data),
        remove: (id: string) => api.delete(`api/employee/${id}`),
}

