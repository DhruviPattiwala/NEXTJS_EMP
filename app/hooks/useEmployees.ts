import { useState, useEffect, useCallback } from "react";
import { Employee } from "../features/types";
import { employeeService } from "../services/EmployeeService";
import ToastService from "../services/ToastService";
import { AxiosError } from 'axios';
interface ErrorResponse {
    msg: string;
}

export const useEmployee = () => {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        console.log("b : " + loading);
        try {
            const response = await employeeService.getAll();
            setEmployees(response.data);
        } finally {
            console.log("a : " +loading);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);


    const addEmployee = async (emp: Employee)  => {
        try {
            await employeeService.insert(emp);
            setEmployees(prev => [emp, ...prev]);
            ToastService.success("Employee added successfully."); 
            return;
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response && axiosError.response.status == 409) {
                const errorMessage = axiosError.response.data.msg;
                ToastService.error(errorMessage);
            } else {
                ToastService.error('something went wrong...');
            }
        }
         
    };


    const editEmployee = async (id: string, data: Omit<Employee, "id">) => {
        try {
            await employeeService.edit(id, data);
            await fetchEmployees();
            ToastService.success("Employee updated successfully."); 
        } catch (error) {
            ToastService.error("Failed to edit employee" + error);
        }

    }

    const deleteEmployee = async (id: string) => {

        try {
            await employeeService.remove(id);
            await fetchEmployees();
        } catch (error) {
            throw new Error("Failed to delete employee" + error);
        }
    }


    return { employees, loading, addEmployee, deleteEmployee, fetchEmployees, editEmployee }
}

