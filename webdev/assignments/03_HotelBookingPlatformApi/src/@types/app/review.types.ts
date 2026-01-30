import z from "zod";
import { createReviewInputSchema } from "../../validation/review.validation";

export type CreateReviewInputType = z.infer<typeof createReviewInputSchema>;
