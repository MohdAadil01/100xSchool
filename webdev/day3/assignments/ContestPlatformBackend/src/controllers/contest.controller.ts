import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import {
  addMcqToContestSchema,
  createContestSchema,
  submitMcqQuestionSchema,
} from "../validation/contest.validation";
import {
  addMcqToContestService,
  createContestService,
  getContestByIdService,
  submitMcqQuestionService,
} from "../services/contest.service";
import { ApiResponse } from "../utils/ApiResponse";

export const createContest = asyncHandler(
  async (req: Request, res: Response) => {
    const parsedBody = createContestSchema.parse(req.body);

    const contest = await createContestService(
      parsedBody,
      req.user?.id!,
      req.user?.email!,
      req.user?.role!,
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
      req.user?.role!,
    );

    return res.status(201).json(ApiResponse.success(data));
  },
);

export const submitMcqQuestion = asyncHandler(
  async (req: Request, res: Response) => {
    const { contestId, questionId } = req.params;
    const parsedBody = submitMcqQuestionSchema.parse(req.body);
    const data = await submitMcqQuestionService(
      parsedBody,
      req.user?.role!,
      req.user?.id!,
      Number(contestId),
      Number(questionId),
    );

    return res.status(201).json(ApiResponse.success(data));
  },
);
