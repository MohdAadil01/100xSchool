import z from "zod";

const uploadInputSchema = z.object({
  videoUrl: z.string().url(),
  thumbnail: z.string().url(),
});

export const uploadValidator = {
  uploadInputSchema,
};
