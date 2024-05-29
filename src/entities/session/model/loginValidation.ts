import { z } from "zod";

export const loginSchema = z.object({
  userName: z
    .string()
    .min(2, { message: "Must be at least 2 characters" })
    .max(50, { message: "Must be less than 50 characters" }),
});
