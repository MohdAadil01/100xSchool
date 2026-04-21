import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split("Bearer ")[1];
    if (!token) {
      throw new AppError("Unauthorized", 409);
    }

    const decodedData = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as JwtPayload;

    req.user = {
      userId: decodedData.userId,
    };
    next();
  } catch (error) {
    throw new AppError("Error while decoding token " + error, 400);
  }
};
