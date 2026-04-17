import { Router } from "express";
import { userController } from "../controller/user.controller";

const authRouter = Router();

authRouter.post("/signup", userController.signup);
authRouter.post("/login", userController.login);

export default authRouter;
