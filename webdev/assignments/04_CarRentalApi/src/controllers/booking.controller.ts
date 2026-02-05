import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import {
  createBookingInputSchema,
  getBookingInputSchema,
  updateBookingInputSchema,
} from "../validators/booking.validator";
import {
  createBookingService,
  deleteBookingService,
  getUserBookingService,
  updateBookingService,
} from "../services/booking.service";
import { ApiResponse } from "../utils/ApiResponse";

export const createBooking = AsyncHandler(
  async (req: Request, res: Response) => {
    const parsedBody = createBookingInputSchema.parse(req.body);
    const data = await createBookingService(parsedBody, req.user?.id!);

    return res.status(201).json(ApiResponse.success(data));
  },
);

export const updateBooking = AsyncHandler(
  async (req: Request, res: Response) => {
    const { bookingId } = req.params;
    const parsedBody = updateBookingInputSchema.parse(req.body);
    const data = await updateBookingService(
      parsedBody,
      String(bookingId),
      req.user?.id!,
    );

    return res.status(201).json(ApiResponse.success(data));
  },
);

export const deleteBooking = AsyncHandler(
  async (req: Request, res: Response) => {
    const { bookingId } = req.params;
    const data = await deleteBookingService(String(bookingId), req.user?.id!);

    return res.status(200).json(ApiResponse.success(data));
  },
);

export const getBooking = AsyncHandler(async (req: Request, res: Response) => {
  const query = req.query;
  const parsedQuery = getBookingInputSchema.parse(query);
  const data = await getUserBookingService(parsedQuery, req.user?.id!);

  return res.status(200).json(ApiResponse.success(data));
});
