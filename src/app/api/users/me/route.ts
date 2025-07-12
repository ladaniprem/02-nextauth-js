import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/app/helpers/detDataFromToken";

connect();

export async function POST(request: NextRequest) {
    try {
        //exact data from token 
        const userId = await getDataFromToken(request);
        
        const user = await User.findOne({
            _id: userId
        }).select("-password"); // password nahi bejna hai to wo select nahi hota hai

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            Message: "User data fetched successfully",
            data: user,
            success: true,
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}