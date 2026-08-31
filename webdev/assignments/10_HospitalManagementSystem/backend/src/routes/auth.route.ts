import { Router } from "express";
import { authController } from "../controller/auth.controller";

export const authRouter = Router();

authRouter.post("/patient/register", authController.registerPatient);

authRouter.post("/staff/register", authController.registerStaff);

authRouter.post("/login", authController.login);

authRouter.post("/logout", authController.logout);
