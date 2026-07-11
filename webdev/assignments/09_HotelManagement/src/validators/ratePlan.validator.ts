import z from "zod";

export const createRatePlanInputSchema = z.object({
  code: z.string().min(3, "Alteast 3 characters long."),
  name: z.string().min(3, "Alteast 3 characters long."),
  description: z.string(),
  property: z.string(),
  roomTypes: z
    .array(
      z.object({
        roomType: z.string(),
        pricePerNight: z.number().nonnegative(),
      }),
    )
    .default([]),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
});

export const updateRatePlanInputSchema = z.object({
  name: z.string().min(3, "Alteast 3 characters long.").optional(),
  description: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export const addRoomTypeInputSchema = z.object({
  roomType: z.string(),
  pricePerNight: z.number().nonnegative(),
});

export const removeRoomTypeInputSchema = z.object({
  roomType: z.string(),
});

export type CreateRatePlanInputType = z.infer<typeof createRatePlanInputSchema>;
export type UpdateRatePlanInputType = z.infer<typeof updateRatePlanInputSchema>;
export type AddRoomTypeInputType = z.infer<typeof addRoomTypeInputSchema>;
export type RemoveRoomTypeInputType = z.infer<typeof removeRoomTypeInputSchema>;
