import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
     const reqbody = await request.json();
     const {token} = reqbody;
     console.log(token);
     
     const user = await User.findOne({
          verifyToken: token, 
          verifyTokenExpiry: {$gt: Date.now()}
     });

     if (!user){
          return NextResponse.json({
                error: "Invalid or expired verification token"
          }, {status: 500});
     }

     if (user.isVerified) {
          return NextResponse.json({
               error: "Email is already verified"
          }, {status: 400});
     }

     console.log(user);

     user.isVerified = true;
     user.verifyToken = undefined;
     user.verifyTokenExpiry = undefined;
     await user.save();

     return NextResponse.json({
          message: "Email verified successfully",
          success: true
     }, {status: 200});
     
    } catch (error:unknown) {
     return NextResponse.json({
          message: "An error occurred",
          error: error instanceof Error ? error.message : "Unknown error"
     }, {status: 500});
    }
}
