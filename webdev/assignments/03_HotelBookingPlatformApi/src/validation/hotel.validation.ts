import z from "zod";

export const createHotelInputSchema = z.object({
  name: z.string().min(4, "Name too short"),
  description: z.string().min(10, "Description too short"),
  city: z.string().min(4, "City too short"),
  country: z.string().min(4, "Country too short"),
  amenities: z
    .array(
      z
        .string()
        .min(1, "Amenity cannot be empty")
        .transform((val) => val.toLowerCase().trim()),
    )
    .min(1, "Atleast one amenity is required"),
});

export const addRoomToHotelInputSchema = z.object({
  roomNumber: z.coerce.number().int().min(1),
  roomType: z
    .string()
    .min(2, "Room type shoult be atleast 2 character long")
    .transform((v) => v.toUpperCase()),
  pricePerNight: z.number().nonnegative("Price can't be negative"),
  maxOccupancy: z
    .number()
    .int()
    .nonnegative("Occupancy can't be negative")
    .min(1),
});
