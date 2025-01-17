import {z} from "zod"

export const profileAccountSchema = z.object({
    newEmail: z
    .string()
    .email("Invalid email address"),
  newUserName: z
    .string()
    .min(5, "Username must be atleast 5 characters long")
    .transform((val) => val.toLowerCase().replace(/\s+/g, "")),
  newFullName: z
    .string()
    .min(5, "Fullname must be atleast 5 characters long"),
})

export const profilePasswordSchema = z.object({
   oldPassword: z
    .string()
    .nonempty("Old Password is required"),
   newPassword: z
    .string()
    .nonempty("Plese enter new password")
    .min(6, "Password must be 6+ characters"),
  confirmNewPassword: z.string().nonempty("Confirm password is required"),
}).refine((data)=> data.newPassword === data.confirmNewPassword,{
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
})
