import z from "zod";

export const createHotelInputSchema = z.object({
  name: z.string().trim().min(1),

  description: z.string().trim().min(10).optional().default(""),

  city: z.string().trim().min(1),

  country: z.string().trim().min(1),

  amenities: z
    .array(
      z
        .string()
        .trim()
        .min(1)
        .transform((v) => v.toLowerCase()),
    )
    .optional()
    .default([]),
});

export const addRoomToHotelInputSchema = z.object({
  roomNumber: z.string().min(1),
  roomType: z.string().min(2, "Room type shoult be atleast 2 character long"),
  pricePerNight: z.number().nonnegative("Price can't be negative"),
  maxOccupancy: z
    .number()
    .int()
    .nonnegative("Occupancy can't be negative")
    .min(1),
});
