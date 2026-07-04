import z from "zod";

export const commentInputSchema = z.object({
  content: z.string().min(3, "Minimum 3 characters long."),
});

export type CommentInputType = z.infer<typeof commentInputSchema>;
