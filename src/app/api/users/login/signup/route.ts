import {connect} from '@/app/dbConfig/dbConfig';
import User from '@/app/models/userModel';
import { error } from 'console';
import { NextResponse,NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/app/helpers/mailer';

connect();

export default async function POST(request:NextRequest){

    try {

        const req = request.json();
        const [username, password, email] =  req;
        
        // validation

        console.log(req);

        const user = await User.findOne({email})

        if (user) {
            return NextResponse.json({error:"user is already Exists"},
                {status:400});
        }

        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

       const newUser =  new User({
            username,
            email,
            password: hashedPassword
        })

       const savedUser =  await newUser.save();

       // send verification email

         await sendEmail({
            email,
            emailType : 'verification',
            userId : savedUser._id,
         })
         return NextResponse.json(
            {
                message:"user Registered successfully",
                Success: true,
                savedUser
            }
         )
        
    } catch (error :any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

