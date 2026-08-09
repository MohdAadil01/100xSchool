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
  const { userWithoutPassword: user, token } =
    await authService.register(parsedBody);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });

  return res.status(201).json(ApiResponse.ok(201, { user }, "Registered"));
});

const login = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = loginInputSchema.parse(req.body);
  const { userWithoutPassword: user, token } =
    await authService.login(parsedBody);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json(ApiResponse.ok(200, { user }, "Logged in"));
});

const me = AsyncHandler(async (req: Request, res: Response) => {
  const id = req.user?.id;
  const response = await authService.me(id!);
  return res.status(200).json(ApiResponse.ok(200, response, "Get me"));
});

const logout = AsyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.status(200).json(ApiResponse.ok(200, null, "Logged Out"));
});

export const authController = {
  register,
  login,
  me,
  logout,
};
