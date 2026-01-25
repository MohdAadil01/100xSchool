import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";

export const createPurchase = asyncHandler(
  async (req: Request, res: Response) => {},
);

export const geetUserPurchases = asyncHandler(
  async (req: Request, res: Response) => {},
);
