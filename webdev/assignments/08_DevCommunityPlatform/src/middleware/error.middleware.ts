import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";
import { ApiResponse } from "../utils/ApiResponse";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    const issue = err.issues[0];
    console.log(issue);
    return res
      .status(400)
      .json(ApiResponse.fail(400, issue.message, issue.code));
  } else if (err instanceof AppError) {
    return res
      .status(err.status)
      .json(ApiResponse.fail(err.status, err.message));
  }

  console.log(err);
  return res
    .status(500)
    .json(ApiResponse.fail(500, err.message, "Unhandled error"));
};
