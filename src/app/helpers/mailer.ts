import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"
import User from "../models/userModel";

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

        await bcrypt.hash(userId.toString(),10);

    if (emailType === 'verification') {
        await User.findByIdAndUpdate(userId, {
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000
        });
    }
    else if (emailType === 'RESET') {
        await User.findByIdAndUpdate(userId, {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000
        });
    }

        const transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
          user: "5d2b322d5ab882", // ❌ 🔥
          pass: "5b07caba543764", // ❌
  }
});

        const mailOptions = {
            from: 'prem123@gmail.com',
            to : "" + email,
            subject: emailType === "Verify" ? "Verify your email" : "Reset your password",
            // text: emailType === "welcome" ? "Thank you for signing up!" : "Click here to reset your password.",
            html: emailType === "verification" 
                ? `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email.</p>
                   <p>This link will expire in 1 hour.</p>
                   <p>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
                : `<p>Click <a href="${process.env.DOMAIN}/forgotpassword?token=${hashedToken}">here</a> to reset your password.</p>
                   <p>This link will expire in 1 hour.</p>
                   <p>${process.env.DOMAIN}/forgotpassword?token=${hashedToken}</p>`
    } // Note :- when the open to link to verify the browser but the some the directly open it to some of the users fake to verify it '
    // Note :- most important to handle the error in the production code to remember it.
    // Note :- verifycation mostly used it the page to provide it after verify it.

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