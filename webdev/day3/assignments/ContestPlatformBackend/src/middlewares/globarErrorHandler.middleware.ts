import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { AppError } from "../utils/AppError";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(ApiResponse.error(err.errorCode));
  }

  console.error(err);

  return res.status(500).json(ApiResponse.error("INTERNAL_SERVER_ERROR"));
};
