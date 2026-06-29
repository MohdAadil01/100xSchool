import z from "zod";

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

export type CreatePostInputType = z.infer<typeof createPostInputSchema>;
