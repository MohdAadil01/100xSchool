import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export const roleMiddleware = (...inputRole: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role) throw new AppError(404, "Not authorzed");

    if (!inputRole.includes(role))
      throw new AppError(401, "You are not authorized to access this resource");

    next();
  };
};
