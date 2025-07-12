import {connect} from '@/app/dbConfig/dbConfig';
import User from '@/app/models/userModel.js';
import { NextResponse,NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/app/helpers/mailer';

let isConnected = false;

export async function POST(request: NextRequest) {
    if (!isConnected) {
        await connect();
        isConnected = true;
    }
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        
        // Basic validation
        if (!username || !email || !password) {
            return NextResponse.json({
                error: "Username, email, and password are required"
            }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({
                error: "Password must be at least 6 characters long"
            }, { status: 400 });
        }

        console.log("Request body:", reqBody);

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({error:"user is already Exists"},
                {status:400});
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

       const newUser =  new User({
            username,
            email,
            password: hashedPassword
        })

       const savedUser = await newUser.save();
       console.log("User saved successfully:", savedUser._id);

       // send verification email (optional - commented out for testing)
       try {
           const hashedToken = await bcrypt.hash(savedUser._id.toString(), 10);
           
           await sendEmail({
                email,
                emailType: 'verification',
                userId: savedUser._id.toString(),
                hashedToken
             });
             console.log("Verification email sent successfully");
       } catch (emailError) {
           console.error("Email sending failed:", emailError);
           // Continue anyway - don't fail registration due to email issues
       }
       

         return NextResponse.json({
                message: "User registered successfully",
                success: true,
                savedUser: {
                    id: savedUser._id,
                    username: savedUser.username,
                    email: savedUser.email,
                    isVerified: savedUser.isVerified
                }
            });
        
    } catch (error: unknown) {
        console.error("Signup error:", error);
        
        if (error instanceof Error) {
            // Handle specific MongoDB errors
            if (error.message.includes('duplicate key error')) {
                return NextResponse.json({
                    error: "User with this email or username already exists"
                }, { status: 400 });
            }
            
            return NextResponse.json({
                error: error.message
            }, { status: 500 });
        }
        
        return NextResponse.json({
            error: 'Something went wrong'
        }, { status: 500 });
    }
}

