import { NextFunction, Response, Request } from "express";
import { AppError } from "../utils/AppError";
import { error } from "node:console";
import { ApiResponse } from "../utils/ApiResponse";
import { ZodError } from "zod";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json(ApiResponse.error(err.message));
  } else if (err instanceof ZodError) {
    const issue = err.issues[0];
    console.log(issue.code);
    res
      .status(Number(400))
      .json(
        ApiResponse.error(`${issue.message} : ${issue.input} : ${issue.path}`),
      );
    next();
  }

  res.status(500).json(ApiResponse.error("Unhandled Error: " + err.message));
  next();
};
