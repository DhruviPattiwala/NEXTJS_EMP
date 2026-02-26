import mongoose from "mongoose";
import {type IEmployee } from "@/app/features/types";

const employeeSchema = new mongoose.Schema<IEmployee>({
    firstName : String,
    lastName : String,
    middleName : String,
    email : String,
    phone : String,
    dob : Date,
    joiningDate : Date,
    gender : String,
    designation : String,
    skills : [String],
    description : String,
    profile : String
});

export const employeeModel = mongoose.models.Employees ||  mongoose.model<IEmployee>("Employees",employeeSchema);

