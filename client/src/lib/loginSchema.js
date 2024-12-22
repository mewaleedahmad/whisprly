import { z } from "zod";

const loginSchema = z.object({
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
    password: z.string().nonempty("Password is required"),
  });

  export default loginSchema;
