import { Employee } from "../../types";
import { api } from "./api";

export const employeesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query<Employee[], void>({
      query: () => ({
        url: "/employees",
        method: "GET",
      }),
    }),
    getEmployee: builder.query<Employee, string>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "GET",
      }),
    }),
    addEmployee: builder.mutation<Employee, Employee>({
      query: (employee) => ({
        url: `/employees/add`,
        method: "POST",
        body: employee,
      }),
    }),
    editEmployee: builder.mutation<string, Employee>({
      query: (employee) => ({
        url: `/employees/edit/${employee.id}`,
        method: "POST",
        body: employee,
      }),
    }),
    removeEmployee: builder.mutation<string, string>({
      query: (id) => ({
        url: `/employees/remove/${id}`,
        method: "POST",
        body: { id },
      }),
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useGetEmployeeQuery,
  useAddEmployeeMutation,
  useEditEmployeeMutation,
  useRemoveEmployeeMutation,
} = employeesApi;
export const {
  endpoints: {
    getAllEmployees,
    getEmployee,
    addEmployee,
    editEmployee,
    removeEmployee,
  },
} = employeesApi;
