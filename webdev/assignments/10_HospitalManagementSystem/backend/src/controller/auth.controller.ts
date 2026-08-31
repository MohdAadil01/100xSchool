import { Request, Response } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import {
  loginInputSchema,
  patientInputSchema,
  staffInputSchema,
} from "../validators/auth.validator";
import { authService } from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";
import { ENV } from "../config/env.config";

const registerPatient = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = patientInputSchema.parse(req.body);
  const { user, token } = await authService.registerPatient(parsedBody);

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(201)
    .json(ApiResponse.ok(201, { user }, "Registered Successfully."));
});

const registerStaff = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = staffInputSchema.parse(req.body);
  const { user, token } = await authService.registerStaff(parsedBody);

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(201)
    .json(ApiResponse.ok(201, { user }, "Registered Successfully."));
});

const login = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = loginInputSchema.parse(req.body);
  const { user, token } = await authService.login(parsedBody);

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(200)
    .json(ApiResponse.ok(200, { user }, "Logged in Successfully."));
});

const me = AsyncHandler(async (req: Request, res: Response) => {
  const id = req.user?.id;
  const user = await authService.me(id!);

  return res.status(200).json(ApiResponse.ok(200, user, "Success"));
});

const logout = AsyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("accessToken");

  return res.status(200).json(ApiResponse.ok(200, null, "Logged out."));
});

export const authController = {
  registerPatient,
  registerStaff,
  login,
  me,
  logout,
};
