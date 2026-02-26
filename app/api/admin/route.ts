import { adminModel } from "@/model/adminModel";
import connectDb from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        await connectDb();
        const email = req.nextUrl.searchParams.get('email');
        if (!email) {  return NextResponse.json({ msg: "Email is required" }, { status: 400 }); }
        const admin = await adminModel.findOne({ email: email });
        if (!admin) {  return NextResponse.json({ msg: `error : admin not found` }, { status: 404 });
        } else {  return NextResponse.json({ msg: admin }, { status: 200 }); }
    } catch (error) {
        return NextResponse.json({ msg: `error : ${error}` }, { status: 500 });
    }
}