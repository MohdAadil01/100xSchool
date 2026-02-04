import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/Error";
import { ApiResponse } from "../utils/ApiResponse";
import { ZodError } from "zod";

export const authMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(ApiResponse.error(err.message));
  }
  if (err instanceof ZodError) {
    const issues = err.issues[0];
    return res
      .status(400)
      .json(
        ApiResponse.error(
          `${issues.message} : ${issues.path} : ${issues.input}`,
        ),
      );
  }

  console.log(err);
  return res
    .status(400)
    .json(ApiResponse.error(`Unhandled Error: ${err.message}`));
};
