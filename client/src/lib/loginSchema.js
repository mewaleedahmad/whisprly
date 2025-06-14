import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address")
    .transform((val) => val.toLowerCase().trim().replace(/\s+/g, "")),
  password: z.string().nonempty("Password is required"),
});

export default loginSchema;
