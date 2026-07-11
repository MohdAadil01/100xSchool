import z from "zod";

export const createRoomTypeInputSchema = z.object({
  code: z.string().min(3, "Atleast 3 characters long."),
  name: z.string().min(3, "Atleast 3 characters long."),
  description: z.string().min(3, "Atleast 3 characters long."),
  bedType: z.enum(["king", "queen", "double", "twin", "single"]),
  maxOccupancy: z.number().default(2),
  features: z
    .array(z.string().transform((x) => x.toLowerCase().trim()))
    .default([]),
  property: z.string(),
});

export const updateRoomTypeInputSchema = z.object({
  code: z.string().min(3, "Atleast 3 characters long.").optional(),
  name: z.string().min(3, "Atleast 3 characters long.").optional(),
  description: z.string().min(3, "Atleast 3 characters long.").optional(),
  bedType: z.enum(["king", "queen", "double", "twin", "single"]).optional(),
  maxOccupancy: z.number().default(2).optional(),
  features: z
    .array(z.string().transform((x) => x.toLowerCase().trim()))
    .default([])
    .optional(),
  property: z.string().optional(),
});

export type CreateRoomTypeInputType = z.infer<typeof createRoomTypeInputSchema>;
export type UpdateRoomTypeInputType = z.infer<typeof updateRoomTypeInputSchema>;
