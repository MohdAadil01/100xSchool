import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { login, signup } from "../controller/auth.controller";

const authRoute = Router();

authRoute.post("/signup", signup);
authRoute.post("/login", login);

export default authRoute;
