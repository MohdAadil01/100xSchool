import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import {
  createRoomTypeInputSchema,
  updateRoomTypeInputSchema,
} from "../validators/roomType.validator";
import { roomTypeService } from "../services/roomType.service";
import { ApiResponse } from "../utils/ApiResponse";
import { AppError } from "../utils/AppError";

const create = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = createRoomTypeInputSchema.parse(req.body);
  const response = await roomTypeService.create(parsedBody);

  return res
    .status(201)
    .json(ApiResponse.ok(201, response, "Created Room Type"));
});

const getAll = AsyncHandler(async (req: Request, res: Response) => {
  const property = req.user?.propertyId;
  const role = req.user?.role;

  const targetProperty =
    role === "superadmin" ? (req.query.propertyId as string) : property;

  if (!targetProperty) throw new AppError(404, "Property id not found.");

  const response = await roomTypeService.getAll(targetProperty);

  return res.status(200).json(ApiResponse.ok(200, response, "All Room Type"));
});

const getById = AsyncHandler(async (req: Request, res: Response) => {
  const { roomTypeId } = req.params;

  const response = await roomTypeService.getById(String(roomTypeId));

  return res.status(200).json(ApiResponse.ok(200, response, "Room Type"));
});

const update = AsyncHandler(async (req: Request, res: Response) => {
  const { roomTypeId } = req.params;
  const parsedBody = updateRoomTypeInputSchema.parse(req.body);
  const response = await roomTypeService.update(parsedBody, String(roomTypeId));

  return res
    .status(200)
    .json(ApiResponse.ok(200, response, "Updated Room Type"));
});

const deactivate = AsyncHandler(async (req: Request, res: Response) => {
  const { roomTypeId } = req.params;

  const response = await roomTypeService.deactivate(String(roomTypeId));

  return res
    .status(200)
    .json(ApiResponse.ok(200, response, "Updated Room Type"));
});

export const roomTypeController = {
  create,
  getAll,
  getById,
  update,
  deactivate,
};
