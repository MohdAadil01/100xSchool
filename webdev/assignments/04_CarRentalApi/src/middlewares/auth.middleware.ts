import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../utils/Error";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AppError(401, "Authorization header missing");
    }

    const token = authHeader?.split(" ")[1];
    if (!token) {
      throw new AppError(401, "Token missing after Bearer");
    }
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as JwtPayload;

    req.user = {
      id: decoded.id,
      username: decoded.username,
    };
    next();
  } catch (error) {
    console.log(error);
    throw new AppError(401, "Token invalid");
  }
};
