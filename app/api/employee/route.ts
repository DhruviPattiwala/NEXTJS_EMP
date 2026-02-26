import { employeeModel } from "@/model/employeeModel";
import connectDb from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_req: NextRequest) => {
    try {
        await connectDb();

        const employees = await employeeModel.find();
        if (employees.length < 0) {
            return NextResponse.json({ msg: `error : employees not found` }, { status: 404 });
        } else { return NextResponse.json(employees, { status: 200 }); }
    } catch (error) {
        return NextResponse.json({ msg: `error : ${error}` }, { status: 500 });
    }
}

export const POST = async (req: NextRequest) => {
    try {
        await connectDb();
        const data = await req.json();
        const existingUser = await employeeModel.findOne({ email: data.email });
        if (existingUser) {
            return NextResponse.json({ msg: "User with this email already exists" }, { status: 409 });
        }
        const newUser = await employeeModel.create(data);
        return NextResponse.json({ msg: `${newUser.firstName} added successfully` }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ msg: "fail to create new employee" + error }, { status: 500 });
    }
}