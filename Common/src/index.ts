import { z } from 'zod'

export const signupInputs = z.object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8)
})

export const signinInputs = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export const createblogsInputs = z.object({
    title: z.string(),
    content: z.string()
})

export const updateblogInputs = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string()
})

export type SignupInputs = z.infer<typeof signupInputs>
export type SigninInputs = z.infer<typeof signinInputs>

export type CreateblogsInputs = z.infer<typeof createblogsInputs>
export type UpdateblogInputs = z.infer<typeof updateblogInputs>