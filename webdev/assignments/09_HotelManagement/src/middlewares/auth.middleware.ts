import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!process.env.JWT_SECRET)
      throw new AppError(500, "JWT secret key not found.");
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new AppError(401, "Unauthorized");

    const token = authHeader.split(" ")[1];
    if (!token) throw new AppError(401, "Token missing");

    const data = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
      role: string;
      propertyId: string;
    };

    req.user = {
      id: data.id,
      role: data.role,
      propertyId: data.propertyId,
    };
    next();
  } catch (error) {
    next(error);
  }
};

export const roleMiddleware = (...data: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const role = req.user?.role;
      if (!data.includes(String(role)))
        throw new AppError(403, "Forbidden — you don't have permission");

      next();
    } catch (error) {
      next(error);
    }
  };
};
