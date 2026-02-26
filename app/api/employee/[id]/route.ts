import { employeeModel } from "@/model/employeeModel";
import connectDb from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest,{params}:{params : Promise<{id : string}>}) => {
    try {
        
        await connectDb();
        const data = await req.json();
        const {id} = await params;
        const updatedUser = await employeeModel.findByIdAndUpdate(id,data,{new:true});
        return NextResponse.json({ msg: `${updatedUser.firstName} updated successfully` }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: "fail to update employee" + error }, { status: 500 });
    }
}

export const DELETE = async (req: NextRequest,{params}:{params : Promise<{id : string}>}) => {
    try {
        
        await connectDb();
        const {id} = await params;
        const deleteUser = await employeeModel.findByIdAndDelete(id);
        return NextResponse.json({ msg: `${deleteUser.firstName} delete successfully` }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: "fail to delete employee" + error }, { status: 500 });
    }
}

