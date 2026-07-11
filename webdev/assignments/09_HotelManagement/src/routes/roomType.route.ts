import { Router } from "express";
import { authMiddleware, roleMiddleware } from "../middlewares/auth.middleware";
import { roomTypeController } from "../controllers/roomType.controller";

export const roomTypeRouter = Router();

roomTypeRouter.post(
  "/",
  authMiddleware,
  roleMiddleware("superadmin", "admin"),
  roomTypeController.create,
);

roomTypeRouter.get(
  "/",
  authMiddleware,
  roleMiddleware("superadmin", "admin", "frontdesk"),
  roomTypeController.getAll,
);

roomTypeRouter.get(
  "/:roomTypeId",
  authMiddleware,
  roleMiddleware("superadmin", "admin", "frontdesk"),
  roomTypeController.getById,
);

roomTypeRouter.patch(
  "/:roomTypeId",
  authMiddleware,
  roleMiddleware("superadmin", "admin"),
  roomTypeController.update,
);

roomTypeRouter.patch(
  "/:roomTypeId/deactivate",
  authMiddleware,
  roleMiddleware("superadmin", "admin"),
  roomTypeController.deactivate,
);
