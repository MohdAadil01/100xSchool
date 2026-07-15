import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import {
  createGuestInputSchema,
  searchGuestQueryInputSchema,
  updateGuestInputSchema,
} from "../validators/guest.validator";
import { guestService } from "../services/guest.service";
import { ApiResponse } from "../utils/ApiResponse";
import { AppError } from "../utils/AppError";

const create = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = createGuestInputSchema.parse(req.body);
  const response = await guestService.create(parsedBody);

  return res
    .status(201)
    .json(ApiResponse.ok(201, response, "Created Guest Profile"));
});

const getAll = AsyncHandler(async (req: Request, res: Response) => {
  const property = req.user?.propertyId;
  const role = req.user?.role;

  const targetProperty =
    role === "superadmin" ? (req.query.propertyId as string) : property;
  if (!targetProperty) throw new AppError(404, "Property id not found.");

  const response = await guestService.getAll(targetProperty);
  return res
    .status(200)
    .json(ApiResponse.ok(200, response, "Fetched all guests."));
});

const getById = AsyncHandler(async (req: Request, res: Response) => {
  const { guestId } = req.params;
  const response = await guestService.getById(guestId as string);

  return res.status(200).json(ApiResponse.ok(200, response, "Get By id"));
});

const update = AsyncHandler(async (req: Request, res: Response) => {
  const { guestId } = req.params;
  const parsedBody = updateGuestInputSchema.parse(req.body);
  const response = await guestService.update(guestId as string, parsedBody);

  return res
    .status(200)
    .json(ApiResponse.ok(200, response, "Updated Guest Profile"));
});

const search = AsyncHandler(async (req: Request, res: Response) => {
  const parsedQuery = searchGuestQueryInputSchema.parse(req.query);
  const property = req.user?.propertyId;
  const role = req.user?.role;
  const targetProperty =
    role === "superadmin" ? (req.query.propertyId as string) : property;

  if (!targetProperty) throw new AppError(400, "Property ID required");
  const response = await guestService.search(parsedQuery, targetProperty);

  return res.status(200).json(ApiResponse.ok(200, response, "Fetched..."));
});

export const guestController = {
  create,
  getAll,
  getById,
  update,
  search,
};
