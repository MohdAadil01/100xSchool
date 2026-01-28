import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import { createHotelInputSchema } from "../validation/hotel.validation";
import { createHotelService } from "../services/hotel.service";
import { ApiResponse } from "../utils/ApiResponse";

export const createHotel = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = createHotelInputSchema.parse(req.body);

  const data = await createHotelService({
    ...parsedBody,
    role: req.user?.role!,
    ownerId: req.user?.id!,
  });

  return res.status(201).json(ApiResponse.success(data));
});
