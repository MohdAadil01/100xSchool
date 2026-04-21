import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import { accountService } from "../services/account.service";
import { accountValidator } from "../validators/account.validator";
import { ApiResponse } from "../utils/ApiResponse";

export const create = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = accountValidator.createAccountInputSchema.parse(req.body);
  const data = await accountService.create(parsedBody);

  return res.status(201).json(ApiResponse.success(201, data));
});

export const getAccountDetails = AsyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const data = await accountService.getAccountDetails(userId!);

    return res.status(200).json(ApiResponse.success(200, data));
  },
);

export const accountController = {
  create,
  getAccountDetails,
};
