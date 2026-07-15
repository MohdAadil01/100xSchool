import z from "zod";

export const createGuestInputSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  phone: z.string(),
  nationality: z.string(),
  idType: z.enum(["passport", "national_id", "driving_license"]),
  idNumber: z.string(),
  dateOfBirth: z.coerce.date(),
  address: z.string().optional(),
  membershipType: z.enum(["none", "silver", "gold", "platinum"]),
  memberId: z.string().optional(),
  notes: z.string().optional(),
  property: z.string(),
});

export const updateGuestInputSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  address: z.string().optional(),
  membershipType: z.enum(["none", "silver", "gold", "platinum"]).optional(),
  memberId: z.string().optional(),
  notes: z.string().optional(),
});

export const searchGuestQueryInputSchema = z.object({
  lastName: z.string().optional(),
  email: z.string().optional(),
});

export type UpdateGuestInputType = z.infer<typeof updateGuestInputSchema>;
export type CreateGuestInputType = z.infer<typeof createGuestInputSchema>;
export type SearchGuestQueryType = z.infer<typeof searchGuestQueryInputSchema>;
