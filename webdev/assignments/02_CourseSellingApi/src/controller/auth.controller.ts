import { asyncHandler } from "../utils/AsyncHandler";
import { Request, Response } from "express";
import {
  loginInputSchema,
  signupInputSchema,
} from "../validation/auth.validation";
import { loginService, signupService } from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = signupInputSchema.parse(req.body);
  const data = await signupService(parsedData);

  return res.status(201).json(ApiResponse.success(data));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = loginInputSchema.parse(req.body);
  const data = await loginService(parsedData);

  return res.status(200).json(ApiResponse.success(data));
});
