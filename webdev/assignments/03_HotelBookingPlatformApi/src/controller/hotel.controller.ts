import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import {
  addRoomToHotelInputSchema,
  createHotelInputSchema,
} from "../validation/hotel.validation";
import {
  addRoomToHotelService,
  createHotelService,
  getHotelService,
  getHotelsService,
} from "../services/hotel.service";
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

export const addRoomToHotel = AsyncHandler(
  async (req: Request, res: Response) => {
    const { hotelId } = req.params;
    const parsedBody = addRoomToHotelInputSchema.parse(req.body);
    const data = await addRoomToHotelService(
      {
        ...parsedBody,
        ownerId: req.user?.id!,
        role: req.user?.role!,
      },
      String(hotelId),
    );

    return res.status(201).json(ApiResponse.success(data));
  },
);

export const getHotels = AsyncHandler(async (req: Request, res: Response) => {
  const data = await getHotelsService(req.query);

  return res.status(200).json(ApiResponse.success(data));
});

export const getHotel = AsyncHandler(async (req: Request, res: Response) => {
  const { hotelId } = req.params;
  const data = await getHotelService(String(hotelId), req.user?.id!);

  return res.status(200).json(ApiResponse.success(data));
});
