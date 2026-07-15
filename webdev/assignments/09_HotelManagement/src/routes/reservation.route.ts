import { Router } from "express";
import { authMiddleware, roleMiddleware } from "../middlewares/auth.middleware";
import { reservationController } from "../controllers/reservation.controller";

export const reservationRouter = Router();

reservationRouter.post(
  "/",
  authMiddleware,
  roleMiddleware("frontdesk"),
  reservationController.create,
);

reservationRouter.post(
  "/availability",
  authMiddleware,
  roleMiddleware("frontdesk", "admin", "superadmin"),
  reservationController.searchAvailability,
);

reservationRouter.get(
  "/",
  authMiddleware,
  roleMiddleware("frontdesk", "admin", "superadmin"),
  reservationController.getAll,
);

reservationRouter.get(
  "/:reservationId",
  authMiddleware,
  roleMiddleware("frontdesk", "superadmin", "admin"),
  reservationController.getById,
);

reservationRouter.patch(
  "/:reservationId/checkout",
  authMiddleware,
  roleMiddleware("frontdesk"),
  reservationController.checkOut,
);

reservationRouter.patch(
  "/:reservationId/checkin",
  authMiddleware,
  roleMiddleware("frontdesk"),
  reservationController.checkIn,
);

reservationRouter.patch(
  "/:reservationId/noshow",
  authMiddleware,
  roleMiddleware("frontdesk"),
  reservationController.noshow,
);

reservationRouter.patch(
  "/:reservationId/cancel",
  authMiddleware,
  roleMiddleware("frontdesk", "superadmin", "admin"),
  reservationController.cancel,
);
