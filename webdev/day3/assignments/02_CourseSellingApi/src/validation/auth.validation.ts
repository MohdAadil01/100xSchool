import z from "zod";

export const signupInputSchema = z.object({
  email: z.string().email("Invalid email."),
  password: z.string().min(6, "Password should be at least 6 char long"),
  name: z.string().min(1, "Name can't be empty"),
  role: z.enum(["student", "instructor"]),
});
export const loginInputSchema = z.object({
  email: z.string().email("Invalid email."),
  password: z.string().min(6, "Password should be at least 6 char long"),
});

export type SignupInputType = z.infer<typeof signupInputSchema>;
export type LoginInputType = z.infer<typeof loginInputSchema>;
