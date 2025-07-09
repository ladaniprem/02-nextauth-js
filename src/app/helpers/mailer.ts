import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"

interface EmailParams {
    email: string;
    emailType: string;
    userId: string;
}

export const sendEmail = async({
    email,
    emailType,
}: EmailParams)=> {
    try {

        await bcrypt.hash(userId.toString(),10);

        if (emailType === 'verification') {
            await User.findByIdAndUpdate(userId {
                {verifyToken}
        })

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });

        const mailOptions = {
            from: 'prem123@gmail.com',
            to : "" + email,
            subject: emailType === "Verify" ? "Verify your email" : "Reset your password",
            // text: emailType === "welcome" ? "Thank you for signing up!" : "Click here to reset your password.",
            html: emailType === "welcome" ? "<h1>Welcome!</h1><p>Thank you for signing up!</p>" : "<h1>Password Reset</h1><p>Click here to reset your password.</p>"

    } 
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
    }
    
    catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Failed to send email: ${error.message}`);
        }
        throw new Error('Failed to send email');
    }
}