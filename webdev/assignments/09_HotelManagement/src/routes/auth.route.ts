import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { rateLimit } from "../middlewares/rateLimit.middleware";

export const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", rateLimit, authController.login);
authRouter.get("/me", authMiddleware, authController.me);
