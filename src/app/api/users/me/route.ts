import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/app/helpers/detDataFromToken";

connect();

export async function POST(request: NextRequest) {
    //exact data from token 
     const userId = await getDataFromToken(request)
    //  User.findById(userId)
   const user = await User.findOne({
    _id: userId
   }).select("-password"); // password nahi bejna hai to wo select nahi hota hai
   // check id exist or not user 

   return NextResponse.json({
    Message: "User data fetched successfully",
    data: user,
    success: true,
})
}