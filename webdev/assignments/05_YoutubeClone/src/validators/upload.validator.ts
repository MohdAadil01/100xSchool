import z from "zod";

const uploadInputSchema = z.object({
  videoUrl: z.string(),
  thumbnail: z.string(),
  userId: z.string(),
});

export const uploadValidator = {
  uploadInputSchema,
};
