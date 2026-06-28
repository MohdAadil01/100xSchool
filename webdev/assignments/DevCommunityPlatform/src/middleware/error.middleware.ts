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
    console.log(err);
  } else if (err instanceof AppError) {
    return res
      .status(err.status)
      .json(ApiResponse.fail(err.status, err.message));
  }

  return res
    .status(500)
    .json(ApiResponse.fail(500, err.message, "Unhandled error"));
};
