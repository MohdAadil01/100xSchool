import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { scheduleController } from "../controller/schedule.controller";

export const scheduleRoute = Router();

scheduleRoute.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  scheduleController.create,
);

scheduleRoute.get(
  "/:doctorId",
  authMiddleware,
  scheduleController.getSchedules,
);
