import * as z from 'zod';

export const loginSchema = z.object({
    email: z.string().min(2).email(),
    password: z.string().min(2)
})
export const registerSchema = z.object({
    username: z.string().min(2),
    email: z.string().min(2).email(),
    password: z.string().min(2),
    confirm_password: z.string().min(2)
})