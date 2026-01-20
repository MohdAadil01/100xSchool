import { getDsaProblemWithVisibleTestCasesService } from "../services/problem.service";
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";

export const getDsaProblemWithVisibleTestCases = asyncHandler(
  async (req: Request, res: Response) => {
    const { problemId } = req.params;
    const data = await getDsaProblemWithVisibleTestCasesService(
      Number(problemId),
    );

    return res.status(200).json(ApiResponse.success(data));
  },
);
