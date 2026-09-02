import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { departmentController } from "../controller/department.controller";

export const departmentRouter = Router();

departmentRouter.post(
  "/",
  authMiddleware,
  roleMiddleware("superadmin", "admin"),
  departmentController.create,
);

departmentRouter.get(
  "/:hospitalId/all",
  authMiddleware,
  departmentController.getAll,
);

departmentRouter.patch(
  "/:hospitalId/:departmentId",
  authMiddleware,
  departmentController.update,
);

departmentRouter.get(
  "/:departmentId",
  authMiddleware,
  departmentController.getById,
);
