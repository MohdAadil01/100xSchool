import z from "zod";
import { createHotelInputSchema } from "../../validation/hotel.validation";

export type CreateHotelInputType = z.infer<typeof createHotelInputSchema>;
