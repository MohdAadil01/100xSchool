import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/Error";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers.authorization;
  if (!header) {
    throw new AppError(404, "Header not found");
  }
  const token = header.split(" ")[1];
  if (!token) {
    throw new AppError(404, "Auth Token not set.");
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

  req.user = {
    id: decodedData.id,
  };

  next();
};
