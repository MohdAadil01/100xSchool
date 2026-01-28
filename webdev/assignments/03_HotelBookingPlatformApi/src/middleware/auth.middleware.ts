import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError("UNAUTHORIZED", 401);

  const token = authHeader.split(" ")[1];
  if (!token) throw new AppError("UNAUTHORIZED", 401);

  const decodedData = jwt.verify(
    token,
    process.env.JWT_SECRET!,
  ) as JwtPayload & {
    id: string;
    role: string;
  };
  if (!decodedData) throw new AppError("UNAUTHORIZED", 401);

  req.user = {
    id: decodedData.id,
    role: decodedData.role,
  };

  next();
};
