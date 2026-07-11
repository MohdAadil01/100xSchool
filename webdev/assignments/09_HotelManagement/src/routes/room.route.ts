import { Router } from "express";
import { authMiddleware, roleMiddleware } from "../middlewares/auth.middleware";
import { roomController } from "../controllers/room.controller";

export const roomRouter = Router();

roomRouter.post(
  "/",
  authMiddleware,
  roleMiddleware("superadmin", "admin"),
  roomController.create,
);

roomRouter.get(
  "/",
  authMiddleware,
  roleMiddleware("superadmin", "admin", "frontdesk", "housekeeping"),
  roomController.getAll,
);

roomRouter.get(
  "/:roomId",
  authMiddleware,
  roleMiddleware("superadmin", "admin", "frontdesk", "housekeeping"),
  roomController.getById,
);

roomRouter.patch(
  "/:roomId",
  authMiddleware,
  roleMiddleware("superadmin", "admin"),
  roomController.update,
);

roomRouter.patch(
  "/:roomId/status",
  authMiddleware,
  roleMiddleware("superadmin", "admin", "frontdesk", "housekeeping"),
  roomController.updateStatus,
);

roomRouter.patch(
  "/:roomId/deactivate",
  authMiddleware,
  roleMiddleware("superadmin", "admin"),
  roomController.deactivate,
);
