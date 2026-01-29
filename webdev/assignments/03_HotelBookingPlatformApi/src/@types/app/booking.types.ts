import z from "zod";
import { createBookingInputSchema } from "../../validation/booking.validation";

export type CreateBookingInputType = z.infer<typeof createBookingInputSchema>;
