import { Request, Response } from "express";
import AsyncHandler from "../utils/AsyncHandler";
import {
  createDepartmentInputSchema,
  updateDepartmentInputSchema,
} from "../validators/department.validator";
import { departmentService } from "../services/department.service";
import { ApiResponse } from "../utils/ApiResponse";

const create = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = createDepartmentInputSchema.parse(req.body);
  const response = await departmentService.create(parsedBody);

  return res
    .status(201)
    .json(ApiResponse.ok(201, response, "Created Department."));
});

const update = AsyncHandler(async (req: Request, res: Response) => {
  const { hospitalId, departmentId } = req.params;
  const parsedBody = updateDepartmentInputSchema.parse(req.body);
  const response = await departmentService.update(
    parsedBody,
    String(hospitalId),
    String(departmentId),
  );

  return res
    .status(200)
    .json(ApiResponse.ok(201, response, "Updated Department."));
});

const getAll = AsyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;
  const { hospitalId } = req.params;
  const response = await departmentService.getAll(String(hospitalId), { name });

  return res.status(200).json(ApiResponse.ok(200, response, "Get all"));
});

const getById = AsyncHandler(async (req: Request, res: Response) => {
  const { departmentId } = req.params;
  const response = await departmentService.getById(String(departmentId));

  return res.status(200).json(ApiResponse.ok(200, response, "Get by id."));
});

export const departmentController = {
  create,
  update,
  getById,
  getAll,
};
