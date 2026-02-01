import z from "zod";

export const createReviewInputSchema = z.object({
  bookingId: z.string(),
  rating: z.number().nonnegative("Rating can not be negative").min(1).max(5),
  comment: z.string().min(3, "Comment too short"),
});
