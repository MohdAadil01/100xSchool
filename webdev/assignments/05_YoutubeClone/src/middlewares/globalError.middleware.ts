import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/Error";
import { ApiResponse } from "../utils/ApiResponse";

export const globalError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    console.log(err);
    ApiResponse.error(401, "App Error");
  } else if (err instanceof ZodError) {
    console.log(err.issues);
    ApiResponse.error(400, "Zod Error");
  }

  console.log(err);
  ApiResponse.error(400, "Unhandled error");
  next();
};
