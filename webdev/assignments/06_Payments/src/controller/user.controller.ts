import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import { userValidators } from "../validators/user.validator";
import { userService } from "../services/user.service";
import { ApiResponse } from "../utils/ApiResponse";

export const signup = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = userValidators.singupSchema.parse(req.body);

  const data = await userService.singup(parsedBody);

  return res.status(201).json(ApiResponse.success(201, data));
});

export const login = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = userValidators.loginSchema.parse(req.body);

  const data = await userService.login(parsedBody);

  return res.status(200).json(ApiResponse.success(200, data));
});

export const userController = {
  signup,
  login,
};
