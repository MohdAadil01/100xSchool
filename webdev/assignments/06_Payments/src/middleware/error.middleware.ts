import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";
import { ApiResponse } from "../utils/ApiResponse";

export const globalErrorMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    const issues = err.issues;
    console.log(issues[0]);

    const message = issues[0].message;

    res.status(400).json(ApiResponse.error(400, message));
  } else if (err instanceof AppError) {
    const { statusCode, message } = err;

    res.status(statusCode).json(ApiResponse.error(statusCode, message));
  } else {
    console.log(err);
    res.status(400).json(ApiResponse.error(400, "Unhandled error"));
  }
  next();
};
