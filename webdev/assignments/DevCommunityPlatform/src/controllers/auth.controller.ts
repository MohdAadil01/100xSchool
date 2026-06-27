import { Request, response, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import { authInputSchema } from "../validators/auth.validator";
import { authService } from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";

const register = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = authInputSchema.parse(req.body);
  const respsonse = await authService.register(parsedBody);

  return res
    .status(201)
    .json(ApiResponse.ok(201, respsonse, "User Registered."));
});

export const authController = {
  register,
};
