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
    return res
      .status(err.status)
      .json(ApiResponse.error(err.status, err.error));
  } else if (err instanceof ZodError) {
    const errorResponse = `${err.issues[0].message} : ${err.issues[0].path}`;
    return res.status(400).json(ApiResponse.error(400, errorResponse));
  }

  return res
    .status(400)
    .json(ApiResponse.error(400, "Unhandled Error:" + err.message));
  next();
};
