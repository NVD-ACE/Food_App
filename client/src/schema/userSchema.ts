import {z} from 'zod';

export const userSignupSchema = z.object({
    fullname: z.string().min(1,"Fullname is required"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    contact: z.string().min(10, "Contact must be at least 10 digits"),
});
export type SignupInputState = z.infer<typeof userSignupSchema>;

export const userLoginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type LoginInputState = z.infer<typeof userLoginSchema>;