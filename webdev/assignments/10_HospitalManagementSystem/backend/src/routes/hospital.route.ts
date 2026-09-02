import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { hospitalController } from "../controller/hospital.controller";

export const hospitalRouter = Router();

hospitalRouter.post(
  "/",
  authMiddleware,
  roleMiddleware("superadmin"),
  hospitalController.create,
);

hospitalRouter.get("/all", authMiddleware, hospitalController.getAll);

hospitalRouter.patch(
  "/:hospitalId",
  authMiddleware,
  roleMiddleware("superadmin", "admin"),
  hospitalController.update,
);

hospitalRouter.get("/:hospitalId", authMiddleware, hospitalController.getById);
