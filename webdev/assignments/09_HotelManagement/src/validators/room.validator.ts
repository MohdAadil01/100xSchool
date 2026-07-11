import z from "zod";

export const createRoomInputSchema = z.object({
  roomNumber: z.string().min(3, "Atleast 3 characters long."),
  floor: z.number().min(1).default(1),
  roomType: z.string(),
  property: z.string(),
});

export const updateRoomInputSchema = z.object({
  roomNumber: z.string().min(3, "Atleast 3 characters long.").optional(),
  floor: z.number().min(1).optional(),
});

export const updateRoomStatusInputSchema = z.object({
  status: z.enum(["clean", "dirty", "occupied", "outoforder", "outofservice"]),
});

export type CreateRoomInputType = z.infer<typeof createRoomInputSchema>;

export type UpdateRoomInputType = z.infer<typeof updateRoomInputSchema>;

export type UpdateRoomStatusInputType = z.infer<
  typeof updateRoomStatusInputSchema
>;
