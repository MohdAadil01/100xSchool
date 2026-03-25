import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { AsyncHandler } from "../utils/AsyncHandler";
import { authValidator } from "../validators/auth.validator";
import { ApiResponse } from "../utils/ApiResponse";

const singup = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = authValidator.signupInputSchema.parse(req.body);

  const data = await authService.signup(parsedBody);

  return res.status(201).json(ApiResponse.success(201, data));
});

const signin = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = authValidator.signinInputSchema.parse(req.body);

  const data = await authService.signin(parsedBody);

  return res.status(200).json(ApiResponse.success(200, data));
});

export const authController = {
  singup,
  signin,
};
