import z from "zod";
import {
  createBookingInputSchema,
  updateBookingInputSchema,
} from "../../validators/booking.validator";

export type CreateBookingInputType = z.infer<typeof createBookingInputSchema>;

export type UpdateBookingInputType = z.infer<typeof updateBookingInputSchema>;
