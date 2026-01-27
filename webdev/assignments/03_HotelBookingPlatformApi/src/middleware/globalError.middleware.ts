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
    next();
  }
  if (err instanceof ZodError) {
    const issue = err.issues[0];
    console.log(issue.code);
    console.log(`${issue.message} : ${issue.input} : ${issue.path}`);
    res.status(400).json(ApiResponse.error("INVALID_REQUEST"));
    next();
  }

  res.status(500).json(ApiResponse.error("Unhandled Error: " + err.message));
  next();
};
