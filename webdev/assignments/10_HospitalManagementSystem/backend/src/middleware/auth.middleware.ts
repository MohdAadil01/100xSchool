import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { ENV } from "../config/env.config";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) throw new AppError(401, "Not authenticated");

  try {
    const decodedData = jwt.verify(accessToken, ENV.JWT_SECRET!) as {
      id: string;
      email: string;
    };

    const { id, email } = decodedData;
    req.user = {
      id,
      email,
    };
    next();
  } catch (error) {
    throw new AppError(401, "Invalid or expired token");
  }
};
