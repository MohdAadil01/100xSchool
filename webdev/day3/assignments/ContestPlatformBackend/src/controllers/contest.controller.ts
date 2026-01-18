import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import {
  addMcqToContestSchema,
  createContestSchema,
} from "../validation/contest.validation";
import {
  addMcqToContestService,
  createContestService,
  getContestByIdService,
} from "../services/contest.service";
import { ApiResponse } from "../utils/ApiResponse";

export const createContest = asyncHandler(
  async (req: Request, res: Response) => {
    const parsedBody = createContestSchema.parse(req.body);

    const contest = await createContestService(
      parsedBody,
      req.user?.id!,
      req.user?.email!,
    );

    return res.status(201).json(ApiResponse.success(contest));
  },
);

export const getContestById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const contest = await getContestByIdService(id);

    return res.status(200).json(ApiResponse.success(contest));
  },
);

export const addMcqToContest = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: contestId } = req.params;
    const parsedBody = addMcqToContestSchema.parse(req.body);
    const data = await addMcqToContestService(
      parsedBody,
      Number(contestId),
      req.user?.id!,
    );

    return res.status(201).json(ApiResponse.success(data));
  },
);
