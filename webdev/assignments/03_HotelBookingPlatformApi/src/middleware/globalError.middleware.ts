import { NextFunction, Response, Request } from "express";
import { AppError } from "../utils/AppError";
import { error } from "node:console";
import { ApiResponse } from "../utils/ApiResponse";
import { ZodError } from "zod";
import { Prisma } from "../generated/prisma/client";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(ApiResponse.error(err.message));
  }

  if (err instanceof ZodError) {
    const issue = err.issues[0];
    console.log(issue.code);
    console.log(`${issue.message} : ${issue.input} : ${issue.path}`);
    return res.status(400).json(ApiResponse.error("INVALID_REQUEST"));
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code == "P2002") {
      return res.status(409).json(ApiResponse.error("Resource already exists"));
    }
    if (err.code == "P2003") {
      return res
        .status(400)
        .json(ApiResponse.error("Invalid reference provided"));
    }
    if (err.code == "P2025") {
      return res.status(409).json(ApiResponse.error("Record not found"));
    }
  }

  console.error(err);

  return res
    .status(500)
    .json(ApiResponse.error("Unhandled Error: " + err.message));
};
