import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { rateLimit } from "../middlewares/rateLimit.middleware";

export const authRouter = Router();

authRouter.get("/", authController.heathCheck);
authRouter.post("/register", authController.register);
authRouter.post("/login", rateLimit, authController.login);
authRouter.get("/me", authMiddleware, authController.me);
authRouter.post("/logout", authMiddleware, authController.logout);
