import { type HydratedDocument } from 'mongoose';

export type Employee = {

    "_id"?:  null | string,
    "firstName": string,
    "middleName": string,
    "lastName": string,
    "email": string,
    "designation": string,
    "phone":string,
    "gender": string,
    "dob": string , 
    "joiningDate":string,
    "description":string
    "skills" ?:   string[]  | undefined,
    "profile" ?: string | undefined | null
}


export type loginType = {
    email: string;
    password: string;
}

export type employeeProps = {
  editEmployeeData: Employee | null,
  openEmpDialog: boolean,
  closeEmpDialog: (open: boolean) => void
  setOpen: (open: boolean) => void 
  addEmployee: (data: Employee) => Promise<void>;
  editEmployee: (id: string, data: Employee) => Promise<void>;
  employees : Employee[];
}


export type DataTableProps<TData>= {
  data: TData[]
  globalFilter: string
  setGlobalFilter: (filter: string) => void
  onEdit: (emp: Employee) => void
  onDelete :(id: string) => Promise<void>;
  isLoading:boolean
}



export interface IEmployee {
  firstName: string,
  lastName: string,
  middleName: string,
  email: string,
  phone: string,
  dob: Date,
  joiningDate: Date,
  gender: string,
  designation: string,
  skills: [string],
  description: string,
  profile: string
}

export interface IAdmin {
  name: string,
  email: string,
  username: string,
  password: string,
  profile: string,
}
export type EmployeeDocument = HydratedDocument<IEmployee>;
export type AdminDocument = HydratedDocument<IAdmin>;
