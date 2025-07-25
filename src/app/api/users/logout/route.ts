import { connect } from "@/app/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect();

export async function GET() {
    try {
        
     const response =  NextResponse.json({
            message: "Logout successful",
            success: true
      })

      response.cookies.set("token", "", {
        httpOnly: true,
        expires:new Date(0)
      });// Set cookie to expire immediately
      return response;

   } catch (error:unknown) {
       return NextResponse.json({
           message: "An error occurred in logout",
           error: error instanceof Error ? error.message : "Unknown error"
       }, {status: 500})
      }
   
}