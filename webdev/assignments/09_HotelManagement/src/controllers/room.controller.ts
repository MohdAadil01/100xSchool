import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import {
  createRoomInputSchema,
  updateRoomInputSchema,
  updateRoomStatusInputSchema,
} from "../validators/room.validator";
import { roomService } from "../services/room.service";
import { ApiResponse } from "../utils/ApiResponse";
import { AppError } from "../utils/AppError";

const create = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = createRoomInputSchema.parse(req.body);
  const response = await roomService.create(parsedBody);

  return res.status(201).json(ApiResponse.ok(201, response, "Created Room"));
});
const getAll = AsyncHandler(async (req: Request, res: Response) => {
  const property = req.user?.propertyId;
  const role = req.user?.role;

  const targetProperty =
    role === "superadmin" ? (req.query.propertyId as string) : property;

  if (!targetProperty) throw new AppError(400, "Property ID is required");

  const response = await roomService.getAll(targetProperty);

  return res
    .status(200)
    .json(ApiResponse.ok(200, response, "Fetched all rooms for this property"));
});

const getById = AsyncHandler(async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const response = await roomService.getById(roomId as string);
  return res
    .status(200)
    .json(ApiResponse.ok(200, response, "Fetched rooms for this id"));
});

const update = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = updateRoomInputSchema.parse(req.body);
  const { roomId } = req.params;
  const response = await roomService.update(roomId as string, parsedBody);
  return res.status(200).json(ApiResponse.ok(200, response, "Updated"));
});
const updateStatus = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = updateRoomStatusInputSchema.parse(req.body);
  const { roomId } = req.params;
  const response = await roomService.updateStatus(roomId as string, parsedBody);
  return res
    .status(200)
    .json(ApiResponse.ok(200, response, "Updated room status"));
});
const deactivate = AsyncHandler(async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const response = await roomService.deactivate(roomId as string);
  return res.status(200).json(ApiResponse.ok(200, response, "Deactivated"));
});

export const roomController = {
  create,
  getAll,
  getById,
  update,
  updateStatus,
  deactivate,
};
