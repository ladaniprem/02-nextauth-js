import {connect} from '@/app/dbConfig/dbConfig';
import User from '@/app/models/userModel.js';
import { NextResponse, NextRequest } from 'next/server';

connect();

export async function POST(request: NextRequest) {
   try {

    const reqbody = await request.json();
    const {token} = reqbody
    console.log(token);
   const user = await User.findOne({verificationToken: token, verifyTokenExpiry: {$gt: Date.now()}})

    if (!user){
        return NextResponse.json({
            error: "Invalid or expired verification token"
        }, {status: 500});
    }
    console.log(user);

    user.isVerified = true;
    if (!user.isVerified) {
        return NextResponse.json({
            error: "Failed to verify email"
        }, {status: 400});
    }
    user.verificationToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();
     return NextResponse.json({
        message: "Email verified successfully",
        success: true
    }, {status: 200})
    
   } catch (error:unknown) {
    return NextResponse.json({
        message: "An error occurred",
        error: error instanceof Error ? error.message : "Unknown error"
    }, {status: 500})
   }
}