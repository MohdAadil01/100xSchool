import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { createLessionInputSchema } from "../validation/lession.validation";

import { ApiResponse } from "../utils/ApiResponse";
import { createLessonService } from "../services/lesson.service";

export const createLession = asyncHandler(
  async (req: Request, res: Response) => {
    const parsedBody = createLessionInputSchema.parse(req.body);
    const data = await createLessonService(
      parsedBody,
      req.user?.role!,
      req.user?.id!,
    );

    return res.status(201).json(ApiResponse.success(data));
  },
);
