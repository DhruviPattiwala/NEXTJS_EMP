"use client";
import { Suspense } from "react"
import EmployeeList from "@/app/features/employess/EmployeeList"
import { Spinner } from "@/components/ui/spinner"

 const EmployeesPage = () => {
  return (
    <>
      <Suspense fallback={<Spinner/>}><EmployeeList/></Suspense>
        
    </>
  )
}

export default EmployeesPage