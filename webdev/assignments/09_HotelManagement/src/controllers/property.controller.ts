import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import { createPropertyInputSchema } from "../validators/property.validator";
import { propertyService } from "../services/property.service";
import { ApiResponse } from "../utils/ApiResponse";

const create = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = createPropertyInputSchema.parse(req.body);
  const response = await propertyService.create(parsedBody);

  return res
    .status(201)
    .json(ApiResponse.ok(201, response, "Created Property"));
});

export const propertyController = {
  create,
};
