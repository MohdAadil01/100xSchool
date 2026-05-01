import { Request, Response } from "express";
import { problemService } from "../services/problem.service";

const submit = async (req: Request, res: Response) => {
  const { userId, problemId } = req.body;
  const data = await problemService.submit(userId, problemId);

  return res.status(200).json({
    success: true,
    data: data,
  });
};

const getProgress = async (req: Request, res: Response) => {
  const { userId } = req.query;
  const data = await problemService.getProgress(Number(userId));

  return res.status(200).json({
    success: true,
    data: data,
  });
};

export const problemController = {
  submit,
  getProgress,
};
