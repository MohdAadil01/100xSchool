import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new AppError(401, "Unauthenticated ");
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = {
      id: decode.id,
    };
    next();
  } catch (error) {
    next(error);
  }
};
