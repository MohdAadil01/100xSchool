import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!authHeader || !token) {
      // return unauthorized
    }

    const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as JwtPayload;

    req.user = {
      id: decoded.id,
      username: decoded.username,
    };
    next();
  } catch (error) {
    // return error
  }
};
