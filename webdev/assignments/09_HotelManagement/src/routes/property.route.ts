import { Router } from "express";
import { authMiddleware, roleMiddleware } from "../middlewares/auth.middleware";
import { propertyController } from "../controllers/property.controller";

export const propertyRouter = Router();

propertyRouter.post(
  "/",
  authMiddleware,
  roleMiddleware("superadmin"),
  propertyController.create,
);
