import { Request, Response } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import { createDoctorScheduleInputSchema } from "../validators/schedule.validator";
import { scheduleService } from "../services/schedule.service";
import { ApiResponse } from "../utils/ApiResponse";

export const create = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = createDoctorScheduleInputSchema.parse(req.body);

  const response = await scheduleService.create(parsedBody);

  return res
    .status(201)
    .json(ApiResponse.ok(201, response, "Created Doctor Schedule"));
});

export const getSchedules = AsyncHandler(
  async (req: Request, res: Response) => {
    const { doctorId } = req.params;
    const response = await scheduleService.getSchedules(doctorId as string);

    return res
      .status(200)
      .json(ApiResponse.ok(200, response, "Get all schedules for the doctor"));
  },
);
export const scheduleController = {
  create,
  getSchedules,
};
