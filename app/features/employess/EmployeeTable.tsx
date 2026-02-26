import { Button } from "@/components/ui/button"
import { type Employee, type DataTableProps } from "../types";
import { ArrowUpDown, Edit } from "lucide-react"
import React from 'react';
import { type ColumnDef, type ColumnFiltersState, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, getSortedRowModel, type SortingState, getFilteredRowModel } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";

export function EmployeeTable({ data, globalFilter, setGlobalFilter, onEdit, onDelete, isLoading }: DataTableProps<Employee>) {

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "_id",
      header: () => null,
      cell: () => null,
      enableHiding: false,
    },
    {
      id: "expand",
      cell: ({ row }) => {
        const isExpanded = expandedRowId === row.id;
        return (
          <Button variant="ghost" size="sm" onClick={() => setExpandedRowId(isExpanded ? null : row.id)}>{isExpanded ? "−" : "+"}
          </Button>
        );
      },
    },
    {
      accessorKey: "profile",
      header: "Profile",
      cell: ({ row }) => {
        const user = row.original;
        const filename = row.getValue("profile");
        const imageUrl = `${filename}`;
        const initials = user.firstName.split(" ").map((n) => n[0]).join("").substring(0, 2);
        return (
          <Avatar>
            <AvatarImage src={imageUrl || ""} alt={`@${user.firstName}`} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        );
      }
    },
    {
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      id: "fullName",
      cell: ({ row }) => {
        return (
          <span>
            {row.original.firstName} {row.original.lastName}
          </span>
        )
      },
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Full Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    }, {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },

    },
    {
      accessorKey: "designation",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Designation
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const emp = row.original;
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(emp)}><Edit size={16} /></Button>
            <DeleteConfirmationDialog employee={emp} onDelete={onDelete} />
          </div>
        );
      },
    },
  ]

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [expandedRowId, setExpandedRowId] = React.useState<string | null>(null);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const table = useReactTable({
    data, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), onSortingChange: setSorting, getSortedRowModel: getSortedRowModel(), onColumnFiltersChange: setColumnFilters, getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting, columnFilters, globalFilter,
    }, initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    onGlobalFilterChange: setGlobalFilter,
  })

  function ExpandedEmployeeDetails({ employee }: { employee: Employee }) {
    const DOB = new Date(employee.dob).toISOString().split('T')[0];
    const joiningDate = new Date(employee.joiningDate).toISOString().split('T')[0];

    return (
      <Table className="overflow-hidden rounded-lg border bg-background relative ml-12">
        <TableHeader>
          <TableRow className="bg-muted hover:bg-muted">
            <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Middlename</TableHead>
            <TableHead className="text-xs font-semibold uppercase text-muted-foreground">Phone</TableHead>
            <TableHead className="text-xs font-semibold uppercase text-muted-foreground">DOB</TableHead>
            <TableHead className="text-xs font-semibold uppercase text-muted-foreground">joiningDate</TableHead>
            <TableHead className="text-xs font-semibold uppercase text-muted-foreground">description</TableHead>
            <TableHead className="text-xs font-semibold uppercase text-muted-foreground">skills</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="hover:bg-transparent">
            <TableCell>{employee.middleName}</TableCell>
            <TableCell>{employee.phone}</TableCell>
            <TableCell>{DOB}</TableCell>
            <TableCell>{joiningDate}</TableCell>
            <TableCell>{employee.description}</TableCell>
            <TableCell><div className="flex flex-wrap gap-1">
              {employee.skills?.length ? (
                employee.skills.map((skill, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>))) : (
                <span className="text-muted-foreground text-xs">No skills</span>)}</div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }


  return (
    <div>
      <div className="overflow-x-auto overflow-y-auto md:overflow-y-auto mt-10 mb-10 px-4 max-h-[calc(100vh-250px)] rounded-2xl ">
        <Table className="min-w-full table-auto rounded-md">

          <TableHeader className="bg-gray-200 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>)
                })}
              </TableRow>))}
          </TableHeader>
          <TableBody>
  {isLoading ? (
     <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center">
        <div className="flex justify-center items-center gap-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
          Loading employees...
        </div>
      </TableCell>
    </TableRow>
  )
   :  table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => {
                const isExpanded = expandedRowId === row.id;

                return (
                  <React.Fragment key={row.id}>
                    <TableRow>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>))}
                    </TableRow>
                    {isExpanded && (
                      <TableRow className="bg-gray-50">
                        <TableCell colSpan={columns.length}>
                          <ExpandedEmployeeDetails employee={row.original} />
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell>
              </TableRow>
  )}
</TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 mr-2">
        <Button
          variant="outline"
          size="sm" className="bg-sky-950 text-white hover:bg-pink-800 hover:text-white"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>Previous</Button>
        <Button
          variant="outline" className="bg-sky-950 text-white hover:bg-pink-800 hover:text-white"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}>Next</Button>
      </div>
    </div>
  )
}

{/* <div className="  md:overflow-auto md:overflow-y-auto mt-10  mb-10  px-4 max-h-[calc(100vh-250px)] ">
        <Table className=' w-328 min-w-full rounded-2xl border '> */}
{/* <div className="overflow-x-auto overflow-y-auto md:overflow-y-auto mt-10 mb-10 px-4 max-h-[calc(100vh-250px)] rounded-2xl ">
        <Table className="min-w-full table-auto"> */}