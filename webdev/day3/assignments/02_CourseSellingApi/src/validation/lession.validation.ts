import z from "zod";

export const createLessionInputSchema = z.object({
  title: z.string().min(4, "Title should be atleast 4 characters long"),
  content: z.string(),
  courseId: z.uuid(),
});

export type CreateLessionInputType = z.infer<typeof createLessionInputSchema>;
