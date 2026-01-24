import { asyncHandler } from "../utils/AsyncHandler";
import { Request, Response } from "express";

export const createCourse = asyncHandler(
  async (req: Request, res: Response) => {
    return res.send("hi");
  },
);
