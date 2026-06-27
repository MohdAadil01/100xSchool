import z from "zod";

export const authInputSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6, "Password atleast 6 characters long."),
});

export type AuthInputType = z.infer<typeof authInputSchema>;
