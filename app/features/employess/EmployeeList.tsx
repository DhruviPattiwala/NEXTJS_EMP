"use client"
import { EmployeeTable } from "./EmployeeTable";
import { useEmployee } from "@/app/hooks/useEmployees";
import {  useState ,  KeyboardEvent} from "react";
import { Input } from "@/components/ui/input"
import { EmployeeForm } from "./EmployeeForm";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
// import { BsSearch} from "react-icons/bs";
import { Plus } from "lucide-react"
import {type Employee } from "../types";
export default  function EmployeeList() {

const {employees,addEmployee,editEmployee,deleteEmployee,loading} = useEmployee();
const [search, setSearch] = useState("");
const [editEmployees, setEditEmployee] = useState<Employee|null>(null);
const [open, setOpen] = useState(false);


const searchRef = useRef<HTMLInputElement | null>(null);
// function handleSearch() {
//     const value = searchRef.current?.value || '';
//     setSearch(value);
// }
const handleInputChange = () => {
  
    if (searchRef.current?.value === '') {
      setSearch('');
    }
};

function handleEdit(emp : Employee) {
    emp.dob = new Date(emp.dob).toISOString().split('T')[0];
    emp.joiningDate = new Date(emp.joiningDate).toISOString().split('T')[0];
    setEditEmployee(emp);
    setOpen(true);
}

function handleAdd() {
    setEditEmployee(null);
    setOpen(true);
}
const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
     const value = searchRef.current?.value || '';
    setSearch(value);
    }
  };
function closeDialog() {
  return setOpen(false);
}

  return (
    <>

      <div className="flex justify-between items-center mb-4 bg-sky-300 p-5 ml-2 mr-2 rounded-md">
        <h2 className="text-3xl font-bold">Employees</h2>
        <div className="flex gap-2">
        <Input className="bg-white max-w-sm  p-5 rounded-md" placeholder="Search..." ref={searchRef}  onChange={handleInputChange} onKeyDown={handleKeyDown}/>

        {/* <Button type="button" onClick={handleSearch} className="rounded-none p-5"><BsSearch /></Button> */}
         <Button className="bg-sky-700 text-white p-5.5 rounded-md ml-2" onClick={() => handleAdd()}><Plus/>Add New Employee</Button>
        </div>
      </div>

      <EmployeeForm openEmpDialog={open} closeEmpDialog={closeDialog} employees={employees} editEmployeeData = {editEmployees} setOpen={setOpen} addEmployee={addEmployee} editEmployee={editEmployee}/>
      <EmployeeTable  data={employees} globalFilter={search} isLoading={loading} setGlobalFilter={setSearch} onEdit = {handleEdit}  onDelete={deleteEmployee}/>
    </>
  )
}
