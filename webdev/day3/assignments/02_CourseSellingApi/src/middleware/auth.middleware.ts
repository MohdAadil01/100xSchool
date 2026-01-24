import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers.authorization;
  if (!header) {
    throw new AppError("Unauthorized: token not found", 404);
  }
  const token = header.split(" ")[1];
  const decodedData = jwt.verify(
    token,
    process.env.JWT_SECRET!,
  ) as JwtPayload & {
    id: string;
    email: string;
    role: string;
  };

  req.user = {
    id: decodedData.id,
    email: decodedData.email,
    role: decodedData.role,
  };

  next();
};
