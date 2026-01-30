import { Request, Response } from "express";
import {
  cancelBookingService,
  createBookingService,
  getBookingService,
} from "../services/booking.service";
import { AsyncHandler } from "../utils/AsyncHandler";
import {
  bookingQuerySchema,
  createBookingInputSchema,
} from "../validation/booking.validation";
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

export const getBooking = AsyncHandler(async (req: Request, res: Response) => {
  const query = bookingQuerySchema.parse(req.query);

  const data = await getBookingService(req.user?.id!, req.user?.role!, query);

  res.status(200).json(ApiResponse.success(data));
});

export const cancelBooking = AsyncHandler(
  async (req: Request, res: Response) => {
    const { bookingId } = req.params;
    const data = await cancelBookingService(
      String(bookingId),
      req.user?.id!,
      req.user?.role!,
    );

    return res.status(200).json(ApiResponse.success(data));
  },
);
