import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { createContestSchema } from "../validation/contest.validation";
import { createContestService } from "../services/contest.service";
import { ApiResponse } from "../utils/ApiResponse";

export const createContest = asyncHandler(
  async (req: Request, res: Response) => {
    const parsedBody = createContestSchema.parse(req.body);

    const contest = await createContestService(parsedBody, req.user?.id!);

    return res.status(201).json(ApiResponse.success(contest));
  },
);
