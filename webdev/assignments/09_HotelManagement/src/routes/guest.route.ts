import { Router } from "express";
import { authMiddleware, roleMiddleware } from "../middlewares/auth.middleware";
import { guestController } from "../controllers/guest.controller";

export const guestRoute = Router();

guestRoute.post(
  "/",
  authMiddleware,
  roleMiddleware("superadmin", "admin", "frontdesk"),
  guestController.create,
);

guestRoute.get(
  "/",
  authMiddleware,
  roleMiddleware("superadmin", "admin", "frontdesk"),
  guestController.getAll,
);

guestRoute.get(
  "/search",
  authMiddleware,
  roleMiddleware("superadmin", "admin", "frontdesk"),
  guestController.search,
);

guestRoute.get(
  "/:guestId",
  authMiddleware,
  roleMiddleware("superadmin", "admin", "frontdesk"),
  guestController.getById,
);

guestRoute.patch(
  "/:guestId",
  authMiddleware,
  roleMiddleware("superadmin", "admin", "frontdesk"),
  guestController.update,
);
