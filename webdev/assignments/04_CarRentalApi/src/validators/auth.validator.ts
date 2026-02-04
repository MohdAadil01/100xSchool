import z from "zod";

export const authInputSchema = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .strict();
