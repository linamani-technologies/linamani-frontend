import { z } from "zod";

export const schema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(8),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/[a-z]/, "Must contain lowercase")
    .regex(/\d/, "Must contain a number")
    .regex(/[^a-zA-Z0-9]/, "Must contain special character"),
});
