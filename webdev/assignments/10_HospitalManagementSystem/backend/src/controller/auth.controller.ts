import { Request, Response } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import {
  loginInputSchema,
  patientInputSchema,
  staffInputSchema,
} from "../validators/auth.validator";
import { authService } from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";

const registerPatient = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = patientInputSchema.parse(req.body);
  const response = await authService.registerPatient(parsedBody);

  return res
    .status(201)
    .json(ApiResponse.ok(201, response, "Registered Successfully."));
});

const registerStaff = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = staffInputSchema.parse(req.body);
  const response = await authService.registerStaff(parsedBody);

  return res
    .status(201)
    .json(ApiResponse.ok(201, response, "Registered Successfully."));
});

const login = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = loginInputSchema.parse(req.body);
  const response = await authService.login(parsedBody);

  return res
    .status(201)
    .json(ApiResponse.ok(201, response, "Logged in Successfully."));
});

export const authController = {
  registerPatient,
  registerStaff,
  login,
};
