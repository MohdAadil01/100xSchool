import z from "zod";

export const createBookingInputSchema = z
  .object({
    carName: z.string(),
    days: z.number().nonnegative().lte(365),
    rentPerDay: z.number().nonnegative().max(2000),
    bookingDate: z.date(),
  })
  .strict();

export const updateBookingInputSchema = z
  .object({
    carName: z.string().optional(),
    days: z.number().nonnegative().lte(365).optional(),
    rentPerDay: z.number().nonnegative().max(2000).optional(),
    bookingDate: z.date().optional(),
    status: z
      .string()
      .transform((val) => val.toLowerCase())
      .pipe(z.enum(["booked", "completed", "cancelled"])),
  })
  .strict();

export const getBookingInputSchema = z.object({
  bookingId: z.string().optional(),
  summary: z.string().optional,
});
