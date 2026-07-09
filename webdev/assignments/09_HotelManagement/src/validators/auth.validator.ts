import z from "zod";

export const registerInputSchema = z.object({
  firstName: z.string().min(2, "Atleast 2 characters long"),
  lastName: z.string().min(2, "Atleast 2 characters long"),
  email: z.email(),
  password: z.string().min(6, "Password should be atleast 6 characters long."),
  phone: z.string(),
  role: z
    .enum(["superadmin", "admin", "frontdesk", "housekeeping"])
    .default("frontdesk"),
  property: z.string().optional(),
  address: z.string().optional(),
});

export const loginInputSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type RegisterInputType = z.infer<typeof registerInputSchema>;
export type LoginInputSchema = z.infer<typeof loginInputSchema>;
