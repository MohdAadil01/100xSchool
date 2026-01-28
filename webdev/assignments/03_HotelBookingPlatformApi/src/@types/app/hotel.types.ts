import z from "zod";
import {
  addRoomToHotelInputSchema,
  createHotelInputSchema,
} from "../../validation/hotel.validation";

export type CreateHotelInputType = z.infer<typeof createHotelInputSchema>;

export type AddRoomToHotelInputType = z.infer<typeof addRoomToHotelInputSchema>;
