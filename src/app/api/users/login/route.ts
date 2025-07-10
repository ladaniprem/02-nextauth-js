import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {

     try {

       const reqbody = await request.json();
       const { email, password } = reqbody;
       console.log(reqbody);
       
     const user = await User.findOne({ email});
     if (!user) {
        return NextResponse.json({
          message: "User not found"
        }, { status: 400 });
     }
     console.log("User found:", user._id);
  const validpassword= await bcrypt.compare (password,user.password);

  if (!validpassword) {
        return NextResponse.json({
          message: "Invalid password"
        }, { status: 400 });
      }
      
      const tokenData = {
        id: user._id,
        username:user.username,
        email: user.email
      }
   // not need for the await here as jwt.sign is synchronous
     const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!, {expiresIn : "1d"});
     
       const response =  NextResponse.json({
          message: "Login In successful",
          success: true,
        });

        response.cookies.set("token", token,{
          httpOnly: true
        });
        return response;
      
     } catch (error: unknown) {
        return NextResponse.json({
          message: "An error occurred",
          error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500
        })
     }
}