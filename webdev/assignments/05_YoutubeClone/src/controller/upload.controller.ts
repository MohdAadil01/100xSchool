import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import { uploadValidator } from "../validators/upload.validator";
import { uploadService } from "../services/uploads.service";
import { ApiResponse } from "../utils/ApiResponse";

const upload = AsyncHandler(async (req: Request, res: Response) => {
  const parsedBody = uploadValidator.uploadInputSchema.parse(req.body);
  const userId = req.user?.id;
  const data = await uploadService.upload(parsedBody, userId!);
  return res.status(201).json(ApiResponse.success(201, data));
});

const remove = AsyncHandler(async (req: Request, res: Response) => {
  const { uploadId } = req.params;
  const userId = req.user?.id;

  const data = await uploadService.remove(String(uploadId), userId!);

  return res.status(200).json(ApiResponse.success(200, data));
});

const getAll = AsyncHandler(async (req: Request, res: Response) => {
  const userId = req.body;
  const data = await uploadService.getAll(userId);
  return res.status(200).json(ApiResponse.success(200, data));
});

const getSingle = AsyncHandler(async (req: Request, res: Response) => {
  const uploadId = req.body;
  const userId = req.body;

  const data = await uploadService.getSingle(uploadId, userId);

  return res.status(200).json(ApiResponse.success(200, data));
});

const getPresignedUrl = AsyncHandler(async (req: Request, res: Response) => {
  const data = await uploadService.getPresignedUrl();
  return res.status(200).json(ApiResponse.success(200, data));
});

export const uploadController = {
  upload,
  remove,
  getAll,
  getSingle,
  getPresignedUrl,
};
