import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import {
  createPurchaseService,
  getUserPurchasesService,
} from "../services/purchase.service";
import { ApiResponse } from "../utils/ApiResponse";

export const createPurchase = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId } = req.body;
    const data = await createPurchaseService(
      req.user?.role!,
      req.user?.id!,
      courseId,
    );

    return res.status(201).json(ApiResponse.success(data));
  },
);

export const getUserPurchases = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await getUserPurchasesService(req.user?.id!);
    return res.status(200).json(ApiResponse.success(data));
  },
);
