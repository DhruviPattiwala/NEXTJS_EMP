"use client"
import user from "../../../public/user.png"
import { useEmployee } from "@/app/hooks/useEmployees";
import Image from "next/image";
import { useMemo } from 'react';
const Dashboard = () => {
   
   const { employees } = useEmployee();
   const employeeCount = useMemo(() => employees.length, [employees]);
   return (
      <>
         <div className="p-4 mt-2  md:mr-50 ">
            <h1 className='text-xl md:text-3xl'>Welcome to Employee Management System</h1>
            <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-xl mt-6 shadow-xl/30 hover:bg-neutral-secondary-medium">
               <div className='flex items-center ms-4'>
                  <Image src={user} alt="Employee Logo" width={75} height={75} className="mr-5 mb-2" />
                  <div className="mb-3 text-lg font-semibold tracking-tight text-heading leading-8" >Total Employees
                     <p className="text-body" >00{employeeCount}</p>
                  </div></div>
            </div>
         </div>
      </>
   )
}
export default Dashboard