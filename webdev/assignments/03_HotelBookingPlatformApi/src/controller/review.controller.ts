import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import { createReviewInputSchema } from "../validation/review.validation";
import { createReviewService } from "../services/reviews.service";
import { ApiResponse } from "../utils/ApiResponse";

export const createReview = AsyncHandler(
  async (req: Request, res: Response) => {
    const parsedBody = createReviewInputSchema.parse(req.body);
    const data = await createReviewService(
      parsedBody,
      req.user?.role!,
      req.user?.id!,
    );

    return res.status(201).json(ApiResponse.success(data));
  },
);
