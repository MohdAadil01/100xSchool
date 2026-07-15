import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import {
  loginInputSchema,
  registerInputSchema,
} from "../validators/auth.validator";
import { authService } from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";

const register = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = registerInputSchema.parse(req.body);
  const response = await authService.register(parsedBody);

  return res.status(201).json(ApiResponse.ok(201, response, "Registered"));
});

const login = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = loginInputSchema.parse(req.body);
  const response = await authService.login(parsedBody);

  return res.status(200).json(ApiResponse.ok(200, response, "Logged in"));
});

const me = AsyncHandler(async (req: Request, res: Response) => {
  const id = req.user?.id;
  const response = await authService.me(id!);
  return res.status(200).json(ApiResponse.ok(200, response, "Get me"));
});

export const authController = {
  register,
  login,
  me,
};
