import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import { txnValidator } from "../validators/transaction.validators";
import { txnService } from "../services/transaction.service";
import { ApiResponse } from "../utils/ApiResponse";

const transfer = AsyncHandler(async (req: Request, res: Response) => {
  const from = req.user?.userId;
  const { to, status } = req.body;
  const parsedData = txnValidator.transferInputSchema.parse({
    from,
    to,
    status,
  });
  const data = await txnService.transfer(parsedData);

  return res.status(200).json(ApiResponse.success(200, data));
});

const getTransactionDetails = AsyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const data = await txnService.getTransactionDetails(userId!);

    return res.status(200).json(ApiResponse.success(200, data));
  },
);

export const txnController = {
  transfer,
  getTransactionDetails,
};
