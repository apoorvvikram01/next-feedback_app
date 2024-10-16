import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { apiResponse } from "@/types/apiResponse";
import { string } from "zod";

export async function sendVerificationEmail ( 
    email: string,
    username: string,
    verifyCode: string
) : Promise<apiResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'FeedBack App | Verification code',
            react: VerificationEmail({username, otp: verifyCode}),
          });
        return { success: true, message: "Verification email sent successfully"}
    } catch (error) {
        console.log("Error sending verification email",error);
        return {success: false, message : "Failed to send verification email"}
    }
}
