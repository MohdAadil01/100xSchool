import z from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid Email"),
  password: z.string().min(6, "Password too short"),
  role: z.enum(["creator", "contestee"]),
});
