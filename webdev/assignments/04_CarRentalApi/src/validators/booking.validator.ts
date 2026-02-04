import z from "zod";

export const createBookingInputSchema = z
  .object({
    carName: z.string(),
    days: z.number().nonnegative(),
    rentPerDay: z.number().nonnegative(),
  })
  .strict();

export const updateBookingInputSchema = z
  .object({
    carName: z.string().optional(),
    days: z.number().nonnegative().optional(),
    rentPerDay: z.number().nonnegative().optional(),
    status: z
      .string()
      .transform((val) => val.toLowerCase())
      .pipe(z.enum(["booked", "completed", "cancelled"])),
  })
  .strict();
