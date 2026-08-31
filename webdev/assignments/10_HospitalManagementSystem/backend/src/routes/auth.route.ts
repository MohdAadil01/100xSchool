import { Router } from "express";
import { authController } from "../controller/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export const authRouter = Router();

authRouter.post("/patient/register", authController.registerPatient);

authRouter.post("/staff/register", authController.registerStaff);

authRouter.post("/login", authController.login);

authRouter.post("/logout", authController.logout);

authRouter.get("/me", authMiddleware, authController.me);
