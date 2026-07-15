import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import {
  createReservationInputSchema,
  searchAvailabilityInputSchema,
} from "../validators/reservation.validator";
import { reservationService } from "../services/reservation.service";
import { ApiResponse } from "../utils/ApiResponse";
import { AppError } from "../utils/AppError";

const create = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = createReservationInputSchema.parse(req.body);

  const response = await reservationService.create(
    parsedBody,
    String(req.user?.id),
  );

  return res
    .status(201)
    .json(ApiResponse.ok(201, response, "Created Reservation"));
});

const searchAvailability = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = searchAvailabilityInputSchema.parse(req.body);

  const response = await reservationService.searchAvailability(parsedBody);
  return res.status(200).json(ApiResponse.ok(200, response, "Fetch Data"));
});

const getAll = AsyncHandler(async (req: Request, res: Response) => {
  const role = req.user?.role;
  const property =
    role === "superadmin"
      ? (req.query.propertyId as string)
      : req.user?.propertyId;

  if (!property) throw new AppError(404, "Property Id not found");

  const response = await reservationService.getAll(
    property,
    String(req.query.status),
  );

  return res
    .status(200)
    .json(ApiResponse.ok(200, response, "Fetched all reservation"));
});

const checkOut = AsyncHandler(async (req: Request, res: Response) => {
  const { reservationId } = req.params;

  const response = await reservationService.checkOut(String(reservationId));
  return res.status(200).json(ApiResponse.ok(200, response, "Checked out"));
});

const noshow = AsyncHandler(async (req: Request, res: Response) => {
  const { reservationId } = req.params;

  const response = await reservationService.noshow(String(reservationId));
  return res.status(200).json(ApiResponse.ok(200, response, "No Show marked"));
});

const checkIn = AsyncHandler(async (req: Request, res: Response) => {
  const { reservationId } = req.params;

  const response = await reservationService.checkIn(String(reservationId));
  return res.status(200).json(ApiResponse.ok(200, response, "Checked in"));
});

const getById = AsyncHandler(async (req: Request, res: Response) => {
  const { reservationId } = req.params;

  const response = await reservationService.getById(String(reservationId));
  return res.status(200).json(ApiResponse.ok(200, response, "Get by id"));
});

const cancel = AsyncHandler(async (req: Request, res: Response) => {
  const { reservationId } = req.params;

  const response = await reservationService.cancel(String(reservationId));
  return res.status(200).json(ApiResponse.ok(200, response, "Cancelled"));
});

export const reservationController = {
  create,
  searchAvailability,
  getAll,
  checkOut,
  noshow,
  checkIn,
  getById,
  cancel,
};
