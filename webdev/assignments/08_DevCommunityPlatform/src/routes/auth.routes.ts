import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export const authRoute = Router();

authRoute.post("/register", authController.register);
authRoute.post("/login", authController.login);
// authRoute.post("/logout");
authRoute.get("/me", authMiddleware, authController.me);
