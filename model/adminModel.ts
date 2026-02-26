import mongoose from "mongoose";
import { IAdmin } from "@/app/features/types";

const adminSchema = new mongoose.Schema<IAdmin>({
    name : String,
    email : String,
    username : String,
    password : String,
    profile : String,
});

export const adminModel = mongoose.models.admin ||  mongoose.model<IAdmin>("admin",adminSchema);

