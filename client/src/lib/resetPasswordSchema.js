import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be 6+ characters"),
    confirmPassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  export const verificationEmailSchema = z.object({
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
  })
  
export default resetPasswordSchema;
