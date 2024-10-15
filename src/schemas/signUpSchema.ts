import {z} from "zod"

export const usernameValidation = z
    .string()
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username cannot be more than characters")
    .regex(/^[a-zA-Z0-9]+$/, "Username cannot contain special characters")

    export const signUpSchema = z.object({
        username : usernameValidation,
        email : z.string().email({message: "Invalid email address"}),
        password : z.string().min(6,{message: "password must be at least 6 characters"}),
    })

