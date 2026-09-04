import { Request, Response } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import { slotsService } from "../services/slots.service";
import { ApiResponse } from "../utils/ApiResponse";

const availableSlots = AsyncHandler(async (req: Request, res: Response) => {
  const { doctorId, date } = req.query;
  const response = await slotsService.getAvailableSlots(
    doctorId as string,
    date as string,
  );

  return res
    .status(200)
    .json(ApiResponse.ok(200, response, "Get all available slots by date."));
});

export const slotsController = {
  availableSlots,
};
