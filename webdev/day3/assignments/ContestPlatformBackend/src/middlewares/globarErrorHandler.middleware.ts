import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { AppError } from "../utils/AppError";
import { ZodError } from "zod";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(ApiResponse.error(err.message));
  }

  if (err instanceof ZodError) {
    const firstError = err.issues[0];
    return res
      .status(400)
      .json(ApiResponse.error(firstError.message || "VALIDATION_ERROR"));
  }

  console.error(err);

  return res.status(500).json(ApiResponse.error("INTERNAL_SERVER_ERROR"));
};
