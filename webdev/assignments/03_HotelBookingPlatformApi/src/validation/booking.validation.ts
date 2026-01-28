import z from "zod";

export const createBookingInputSchema = z
  .object({
    roomId: z.string().uuid(),
    checkInDate: z.coerce.date(),
    checkOutDate: z.coerce.date(),
    guests: z.number().int().min(1).default(1),
  })
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (data.checkInDate > today) {
        return true;
      }
      return false;
    },
    {
      message: "Booking allowed for only future dates",
      path: ["checkin"],
    },
  )
  .refine(
    (val) => {
      if (val.checkInDate < val.checkOutDate) {
        return true;
      }
      return false;
    },
    {
      message: "Checkout Date should be greater than checkin date",
      path: ["checkout"],
    },
  );
