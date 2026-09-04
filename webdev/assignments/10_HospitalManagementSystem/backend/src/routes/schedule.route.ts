import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { scheduleController } from "../controller/schedule.controller";

const scheduleRoute = Router();

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
