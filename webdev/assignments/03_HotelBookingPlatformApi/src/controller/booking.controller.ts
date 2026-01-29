import { Request, Response } from "express";
import { createBookingService } from "../services/booking.service";
import { AsyncHandler } from "../utils/AsyncHandler";
import { createBookingInputSchema } from "../validation/booking.validation";
import { ApiResponse } from "../utils/ApiResponse";

export const createBooking = AsyncHandler(
  async (req: Request, res: Response) => {
    const parsedBody = createBookingInputSchema.parse(req.body);
    const data = await createBookingService(
      parsedBody,
      req.user?.role!,
      req.user?.id!,
    );

    return res.status(201).json(ApiResponse.success(data));
  },
);
