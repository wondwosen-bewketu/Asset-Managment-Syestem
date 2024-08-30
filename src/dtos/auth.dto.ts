import {z} from "zod"

export const RegisterDto = z.object({
    email: z.string().email(),
    passowrd: z.string().min(8),
})


export const LoginDto = z.object({
    email: z.string().email(),
    password: z.string()
})
