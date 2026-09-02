import { Request, Response } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import {
  createHospitalInputSchema,
  updateHospitalSchema,
} from "../validators/hospital.validator";
import { hospitalService } from "../services/hospital.service";
import { ApiResponse } from "../utils/ApiResponse";

const create = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = createHospitalInputSchema.parse(req.body);
  const response = await hospitalService.create(parsedBody);

  return res
    .status(201)
    .json(ApiResponse.ok(201, response, "Created Hospital."));
});

const update = AsyncHandler(async (req: Request, res: Response) => {
  const { hospitalId } = req.params;
  const parsedBody = updateHospitalSchema.parse(req.body);
  const response = await hospitalService.update(String(hospitalId), parsedBody);

  return res
    .status(200)
    .json(ApiResponse.ok(200, response, "Updated Hospital."));
});

const getAll = AsyncHandler(async (req: Request, res: Response) => {
  const { name, city } = req.query;
  const response = await hospitalService.getAll({
    name: name as string,
    city: city as string,
  });

  return res.status(200).json(ApiResponse.ok(200, response, "Get all"));
});

const getById = AsyncHandler(async (req: Request, res: Response) => {
  const { hospitalId } = req.params;
  const response = await hospitalService.getById(String(hospitalId));

  return res.status(200).json(ApiResponse.ok(200, response, "Get by id"));
});

export const hospitalController = {
  create,
  update,
  getById,
  getAll,
};
