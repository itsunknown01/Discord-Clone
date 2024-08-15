import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1,{
        message: "Password is required"
    })
})

export const PasswordSchema = z.object({
    password: z.string().min(1,{
        message: "Password is required"
    })
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6,{
        message: "Minimum 6 characters is required"
    }),
    name: z.string().min(1,{
        message: "Name is required"
    }), 
    username: z.string().min(1,{
        message: "Username is required"
    }), 
    dateofbirth: z.string().min(1,{
        message: "Date of Birth is required"
    }), 
})

export const serverSchema = z.object({
    name: z.string().min(1, {
      message: "Server name is required",
    }),
    imageUrl: z.string().min(1, {
      message: "Server name is required",
    }),
  });