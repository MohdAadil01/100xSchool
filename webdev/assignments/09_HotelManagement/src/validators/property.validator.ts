import z from "zod";

export const createPropertyInputSchema = z.object({
  name: z.string().min(3, "Minimum 3 characters long."),
  address: z.string().min(3, "Minimum 3 characters long."),
  city: z.string().min(3, "Minimum 3 characters long."),
  country: z.string().min(3, "Minimum 3 characters long."),
  phone: z.string(),
  email: z.email(),
  currency: z.enum(["USD", "INR", "EUR", "GBP", "AED", "SGD"]),
  timezone: z.string(),
});

export type CreatePropertyInputType = z.infer<typeof createPropertyInputSchema>;
