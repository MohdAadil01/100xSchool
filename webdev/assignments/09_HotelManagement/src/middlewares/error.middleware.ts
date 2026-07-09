import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";
import { ApiResponse } from "../utils/ApiResponse";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    const issue = err.issues[0];
    return res.status(400).json(ApiResponse.fail(400, issue.message));
  }
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json(ApiResponse.fail(err.statusCode, err.message));
  }

  console.log(err);
  return res.status(500).json(ApiResponse.fail(500, "Something went wrong"));
};
