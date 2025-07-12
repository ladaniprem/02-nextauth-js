import User from "../models/userModel.js";
import nodemailer from "nodemailer";
interface EmailParams {
    email: string;
    emailType: string;
    userId: string;
    hashedToken: string;
}

export const sendEmail = async({
    email,
    emailType,
    userId,
    hashedToken,

}: EmailParams)=> {
    try {
        const hashedTokenValue = hashedToken;
    //    console.log(`verify user ${emailType} with verification`);

    if (emailType === 'verification') {
        await User.findByIdAndUpdate(userId, {
            $set: {
                verifyToken: hashedTokenValue,
                verifyTokenExpiry: Date.now() + 3600000
            }
        });
        console.log(`Updated user ${userId} with verification token`);
    }
    else if (emailType === 'RESET') {
        await User.findByIdAndUpdate(userId, {
            forgotPasswordToken: hashedTokenValue,
            forgotPasswordTokenExpiry: new Date (Date.now() + 3600000)
        });
        console.log(`Updated user ${userId} with reset token`);
    }

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
  port: Number(process.env.SMTP_PORT) || 2525,
  auth: {
    user: process.env.SMTP_USER || "5d2b322d5ab882", // fallback for testing
    pass: process.env.SMTP_PASS || "5b07caba543764"  // fallback for testing
  }
});

        const mailOptions = {
            from: 'prem123@gmail.com',
            to: email,
            subject: emailType === "verification" ? "Verify your email" : "Reset your password",
            html: emailType === "verification" 
                ? `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email.</p>
                   <p>This link will expire in 1 hour.</p>
                   <p>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
                : `<p>Click <a href="${process.env.DOMAIN}/forgotpassword?token=${hashedTokenValue}">here</a> to reset your password.</p>
                   <p>This link will expire in 1 hour.</p>
                   <p>${process.env.DOMAIN}/forgotpassword?token=${hashedTokenValue}</p>`
    } // Note :- when the open to link to verify the browser but the some the directly open it to some of the users fake to verify it '
    // Note :- most important to handle the error in the production code to remember it.
    // Note :- verification mostly used it the page to provide it after verify it.

    const mailResponse = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${email}:`, mailResponse.messageId);
    return mailResponse;
    }
    
    catch (error: unknown) {
        console.error('Email sending error:', error);
        if (error instanceof Error) {
            throw new Error(`Failed to send email: ${error.message}`);
        }
        throw new Error('Failed to send email');
    }
}