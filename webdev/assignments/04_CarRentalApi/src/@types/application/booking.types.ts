import z from "zod";
import {
  createBookingInputSchema,
  getBookingInputSchema,
  updateBookingInputSchema,
} from "../../validators/booking.validator";

export type CreateBookingInputType = z.infer<typeof createBookingInputSchema>;

export type UpdateBookingInputType = z.infer<typeof updateBookingInputSchema>;

export type GetBookingInputType = z.infer<typeof getBookingInputSchema>;
