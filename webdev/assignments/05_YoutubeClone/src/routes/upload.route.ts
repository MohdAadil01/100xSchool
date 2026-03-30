import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { uploadController } from "../controller/upload.controller";

const uploadRoute = express.Router();

uploadRoute.post("/", authMiddleware, uploadController.upload);
uploadRoute.delete("/:uploadId", authMiddleware, uploadController.remove);
uploadRoute.get("/", authMiddleware, uploadController.getAll);

uploadRoute.post(
  "/getPresignedUrl",
  authMiddleware,
  uploadController.getPresignedUrl,
);
uploadRoute.get("/:uploadId", authMiddleware, uploadController.getSingle);

export default uploadRoute;
