import z from "zod";

export const registerInputSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6, "Password atleast 6 characters long."),
});

export const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password atleast 6 characters long."),
});

export type RegisterInputType = z.infer<typeof registerInputSchema>;
export type LoginInputType = z.infer<typeof loginInputSchema>;
