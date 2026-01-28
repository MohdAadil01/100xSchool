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
