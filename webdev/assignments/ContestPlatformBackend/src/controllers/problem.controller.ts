import {
  getDsaProblemWithVisibleTestCasesService,
  submitDsaProblemService,
} from "../services/problem.service";
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";
import { submitDSaProblemSchema } from "../validation/problem.validation";

export const getDsaProblemWithVisibleTestCases = asyncHandler(
  async (req: Request, res: Response) => {
    const { problemId } = req.params;
    const data = await getDsaProblemWithVisibleTestCasesService(
      Number(problemId),
    );

    return res.status(200).json(ApiResponse.success(data));
  },
);

export const submitDsaProblem = asyncHandler(
  async (req: Request, res: Response) => {
    const { problemId } = req.params;
    const parsedBody = submitDSaProblemSchema.parse(req.body);
    const data = await submitDsaProblemService(
      parsedBody,
      Number(problemId),
      req.user?.id!,
      req.user?.role!,
    );

    return res.status(201).json(ApiResponse.success(data));
  },
);
