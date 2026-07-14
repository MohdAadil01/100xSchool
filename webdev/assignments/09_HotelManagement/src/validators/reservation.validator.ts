import z from "zod";

export const createReservationInputSchema = z.object({
  guest: z.string(),
  property: z.string(),
  ratePlan: z.string(),
  roomType: z.string(),
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
  adults: z.number().default(1),
  children: z.number().default(0),
  specialRequests: z.string().optional(),
  source: z.enum(["walkin", "website", "ota", "phone", "email"]),
});

export const searchAvailabilityInputSchema = z.object({
  property: z.string(),
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
  adults: z.number().default(1),
  children: z.number().default(0),
});

export const searchQueryInputSchema = z.object({
  status: z.enum([
    "reserved",
    "arrival",
    "inhouse",
    "departed",
    "cancelled",
    "noshow",
  ]),
});

export type CreateReservationInputType = z.infer<
  typeof createReservationInputSchema
>;
export type SearchAvailabilityInputType = z.infer<
  typeof searchAvailabilityInputSchema
>;
export type SearchQueryInputType = z.infer<typeof searchQueryInputSchema>;
