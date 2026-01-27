import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import {
  loginInputSchema,
  signupInputSchema,
} from "../validation/auth.validation";
import { loginService, signupService } from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";

export const signup = AsyncHandler(async (req: Request, res: Response) => {
  const parsedData = signupInputSchema.parse(req.body);
  const data = await signupService(parsedData);

  return res.status(201).json(ApiResponse.success(data));
});

export const login = AsyncHandler(async (req: Request, res: Response) => {
  const parsedData = loginInputSchema.parse(req.body);
  const data = await loginService(parsedData);
  return res.status(200).json(ApiResponse.success(data));
});
