import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import {
  addRoomTypeInputSchema,
  createRatePlanInputSchema,
  removeRoomTypeInputSchema,
  updateRatePlanInputSchema,
  updateRoomTypePriceInputSchema,
} from "../validators/ratePlan.validator";
import { ratePlanService } from "../services/ratePlan.service";
import { ApiResponse } from "../utils/ApiResponse";
import { AppError } from "../utils/AppError";

const create = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = createRatePlanInputSchema.parse(req.body);
  const response = await ratePlanService.create(parsedBody);

  return res.status(201).json(ApiResponse.ok(201, response, "Created"));
});

const getAll = AsyncHandler(async (req: Request, res: Response) => {
  const property = req.user?.propertyId;
  const role = req.user?.role;
  const targetProperty =
    role === "superadmin" ? (req.query.propertyId as string) : property;
  if (!targetProperty) throw new AppError(404, "Property id not given");

  const response = await ratePlanService.getAll(String(targetProperty));
  return res.status(200).json(ApiResponse.ok(200, response, "Fetched all"));
});

const getById = AsyncHandler(async (req: Request, res: Response) => {
  const { ratePlanId } = req.params;
  const response = await ratePlanService.getById(ratePlanId as string);

  return res.status(200).json(ApiResponse.ok(200, response, "Fetched by id"));
});

const update = AsyncHandler(async (req: Request, res: Response) => {
  const { ratePlanId } = req.params;
  const parsedBody = updateRatePlanInputSchema.parse(req.body);
  const response = await ratePlanService.update(
    ratePlanId as string,
    parsedBody,
  );

  return res
    .status(200)
    .json(ApiResponse.ok(200, response, "Updated rate plan"));
});

const addRoomType = AsyncHandler(async (req: Request, res: Response) => {
  const { ratePlanId } = req.params;
  const parsedBody = addRoomTypeInputSchema.parse(req.body);
  const response = await ratePlanService.addRoomType(
    ratePlanId as string,
    parsedBody,
  );

  return res.status(200).json(ApiResponse.ok(200, response, "Added Room type"));
});

const removeRoomType = AsyncHandler(async (req: Request, res: Response) => {
  const { ratePlanId } = req.params;
  const parsedBody = removeRoomTypeInputSchema.parse(req.body);
  const response = await ratePlanService.removeRoomType(
    ratePlanId as string,
    parsedBody,
  );

  return res
    .status(200)
    .json(ApiResponse.ok(200, response, "Removed Room type"));
});

const deactivate = AsyncHandler(async (req: Request, res: Response) => {
  const { ratePlanId } = req.params;
  const response = await ratePlanService.deactivate(ratePlanId as string);

  return res
    .status(200)
    .json(ApiResponse.ok(200, response, "Deactivated Rate Plan"));
});

const updateRoomTypePrice = AsyncHandler(
  async (req: Request, res: Response) => {
    const { ratePlanId } = req.params;
    const parsedBody = updateRoomTypePriceInputSchema.parse(req.body);
    const response = await ratePlanService.updateRoomTypePrice(
      ratePlanId as string,
      parsedBody,
    );

    return res
      .status(200)
      .json(ApiResponse.ok(200, response, "Updated Room type price"));
  },
);

export const ratePlanController = {
  create,
  getAll,
  getById,
  update,
  addRoomType,
  removeRoomType,
  deactivate,
  updateRoomTypePrice,
};
