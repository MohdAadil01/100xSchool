import { Router } from "express";
import { authMiddleware, roleMiddleware } from "../middlewares/auth.middleware";
import { reportController } from "../controllers/reports.controller";

export const reportRouter = Router();

reportRouter.get(
  "/:propertyId/revenue",
  authMiddleware,
  roleMiddleware("superadmin"),
  reportController.getMonthlyRevenue,
);

reportRouter.get(
  "/:propertyId/arrivals",
  authMiddleware,
  roleMiddleware("superadmin"),
  reportController.getTodayArrivals,
);

reportRouter.get(
  "/:propertyId/occupancy-rate",
  authMiddleware,
  roleMiddleware("superadmin"),
  reportController.getOccupancyRate,
);
