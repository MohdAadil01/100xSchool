import { Router } from "express";
import { authMiddleware, roleMiddleware } from "../middlewares/auth.middleware";
import { ratePlanController } from "../controllers/ratePlan.controller";

export const ratePlanRouter = Router();

ratePlanRouter.post(
  "/",
  authMiddleware,
  roleMiddleware("superadmin", "admin"),
  ratePlanController.create,
);

ratePlanRouter.get(
  "/",
  authMiddleware,
  roleMiddleware("superadmin", "admin", "frontdesk"),
  ratePlanController.getAll,
);

ratePlanRouter.get(
  "/:ratePlanId",
  authMiddleware,
  roleMiddleware("superadmin", "admin", "frontdesk"),
  ratePlanController.getById,
);

ratePlanRouter.patch(
  "/:ratePlanId/add-room",
  authMiddleware,
  roleMiddleware("superadmin", "admin"),
  ratePlanController.addRoomType,
);

ratePlanRouter.patch(
  "/:ratePlanId/remove-room",
  authMiddleware,
  roleMiddleware("superadmin", "admin"),
  ratePlanController.removeRoomType,
);

ratePlanRouter.patch(
  "/:ratePlanId/deactivate",
  authMiddleware,
  roleMiddleware("superadmin", "admin"),
  ratePlanController.deactivate,
);

ratePlanRouter.patch(
  "/:ratePlanId/update-price",
  authMiddleware,
  roleMiddleware("superadmin", "admin"),
  ratePlanController.updateRoomTypePrice,
);

ratePlanRouter.patch(
  "/:ratePlanId",
  authMiddleware,
  roleMiddleware("superadmin", "admin"),
  ratePlanController.update,
);
