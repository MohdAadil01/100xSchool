import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { ApiResponse } from "../utils/ApiResponse";
import { ZodError } from "zod";

export const globalErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(ApiResponse.error(err.message));
  }
  if (err instanceof ZodError) {
    console.log(err.issues[0]);
    const { code, message, path } = err.issues[0];
    return res
      .status(400)
      .json(ApiResponse.error(`${code} : ${message} : ${path}`));
  }

  res.status(500).json(ApiResponse.error("Unhandled error: " + err.message));

  next();
};
