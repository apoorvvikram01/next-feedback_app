import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/user.model";

export async function POST (request: Request){
    await dbConnect()
    try {
        const {username, code} = await request.json();
        const decodedUsername = decodeURIComponent(username)
        const user = await userModel.findOne({ username: decodedUsername})
        if(!user){
            return Response.json({
                success: false,
                message: "User not found"
            },{status:404})
        }
        const isVerificationCodeValid = user.isVerified === code 
        const isVerificationCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date
        if(isVerificationCodeValid && !isVerificationCodeNotExpired) {
        user.isVerified = true
        await user.save()

        return Response.json({
            success: true,
            message: "User verified successfully"
        },{status:200})
        }else if(!isVerificationCodeValid){
            return Response.json({
                success: false,
                message: "Verification code is not valid"
            },{status:404})
        }
            else {
                return Response.json({
                    success: false,
                    message: " Verification code is expired"
                },{status:404})
            }
        
    }catch (error) {
        console.log(error,"Error verifying user ")
        return Response.json({
            success: false,
            message: "Error verifying user "
        },{status:500})
    }
}