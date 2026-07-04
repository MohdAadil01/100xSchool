import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export const userRoute = Router();

userRoute.get("/:userId", userController.get);
userRoute.put("/update", authMiddleware, userController.update);
userRoute.post("/:userId/follow", authMiddleware, userController.follow);
userRoute.delete("/:userId/follow", authMiddleware, userController.unfollow);
