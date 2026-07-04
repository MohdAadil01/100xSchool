import z, { exactOptional, string } from "zod";

export const createPostInputSchema = z.object({
  title: z.string().min(3, "Title should be atleast 3 characters long"),
  body: z.string().min(3, "Body should be atlease 3 characters long"),
  type: z
    .string()
    .transform((val) => val.toLowerCase())
    .pipe(z.enum(["post", "question"]))
    .default("post"),
  tags: z.array(z.string()),
});

export const voteInputSchema = z.object({
  userId: z.string(),
  postId: z.string(),
  voteType: z.enum(["upvote", "downvote"]),
});

export const updatePostInputSchema = z.object({
  title: z
    .string()
    .min(3, "Title should be atleast 3 characters long")
    .optional(),
  body: z
    .string()
    .min(3, "Body should be atlease 3 characters long")
    .optional(),
  tags: z.array(z.string()).optional(),
});

export type CreatePostInputType = z.infer<typeof createPostInputSchema>;
export type VoteInputType = z.infer<typeof voteInputSchema>;
export type UpdatePostInputType = z.infer<typeof updatePostInputSchema>;
