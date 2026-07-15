import { Router } from "express";
import { authMiddleware, roleMiddleware } from "../middlewares/auth.middleware";
import { guestController } from "../controllers/guest.controller";

export const guestRouter = Router();

guestRouter.post(
  "/",
  authMiddleware,
  roleMiddleware("superadmin", "admin", "frontdesk"),
  guestController.create,
);

guestRouter.get(
  "/",
  authMiddleware,
  roleMiddleware("superadmin", "admin", "frontdesk"),
  guestController.getAll,
);

guestRouter.get(
  "/search",
  authMiddleware,
  roleMiddleware("superadmin", "admin", "frontdesk"),
  guestController.search,
);

guestRouter.get(
  "/:guestId",
  authMiddleware,
  roleMiddleware("superadmin", "admin", "frontdesk"),
  guestController.getById,
);

guestRouter.patch(
  "/:guestId",
  authMiddleware,
  roleMiddleware("superadmin", "admin", "frontdesk"),
  guestController.update,
);
