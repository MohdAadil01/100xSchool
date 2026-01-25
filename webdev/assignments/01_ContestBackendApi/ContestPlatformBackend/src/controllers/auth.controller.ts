import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import {
  signupInputSchema,
  loginInputSchema,
} from "../validation/auth.validators";
import { loginService, signupService } from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const parsedBody = signupInputSchema.parse(req.body);
  const user = await signupService(parsedBody);

  return res.status(201).json(ApiResponse.success(user));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const parsedBody = loginInputSchema.parse(req.body);
  const data = await loginService(parsedBody);

  return res.status(200).json(ApiResponse.success(data));
});
