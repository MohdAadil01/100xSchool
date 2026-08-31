import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { ENV } from "../config/env.config";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) throw new AppError(401, "Not authenticated");

    const decodedData = jwt.verify(accessToken, ENV.JWT_SECRET!) as {
      id: string;
      role: string;
      email: string;
    };

    const { id, email, role } = decodedData;
    req.user = {
      id,
      role,
      email,
    };
    next();
  } catch (error) {
    next(error);
  }
};
