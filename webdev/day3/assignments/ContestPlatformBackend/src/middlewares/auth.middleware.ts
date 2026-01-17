import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("UNAUTHORIZED", 401);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new AppError("UNAUTHORIZED", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
      role: string;
    };

    req.user = decoded;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new AppError("TOKEN_EXPIRED", 401);
    }

    if (error.name === "JsonWebTokenError") {
      throw new AppError("INVALID_TOKEN", 401);
    }

    throw new AppError("UNAUTHORIZED", 401);
  }
};
