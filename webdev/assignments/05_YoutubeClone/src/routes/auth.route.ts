import express from "express";
import { authController } from "../controller/auth.controller";

const authRoute = express.Router();

authRoute.post("/signup", authController.singup);
authRoute.post("/signin", authController.signin);

export default authRoute;
