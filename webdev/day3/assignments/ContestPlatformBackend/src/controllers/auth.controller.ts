import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { signupSchema } from "../validation/auth.validators";
import { signupService } from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const parsedBody = signupSchema.parse(req.body);
  const user = await signupService(parsedBody);

  return res.status(201).json(ApiResponse.success(user));
});
