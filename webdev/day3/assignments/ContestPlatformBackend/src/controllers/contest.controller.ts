import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";

export const getContest = asyncHandler(async (req: Request, res: Response) => {
  res.send("hi");
});
