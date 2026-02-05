import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import { authInputSchema } from "../validators/auth.validator";
import { loginService, signupService } from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";

export const signup = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = authInputSchema.parse(req.body);
  const data = await signupService(parsedBody);

  return res.status(201).json(ApiResponse.success(data));
});

export const login = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = authInputSchema.parse(req.body);
  const data = await loginService(parsedBody);

  return res.status(201).json(ApiResponse.success(data));
});
