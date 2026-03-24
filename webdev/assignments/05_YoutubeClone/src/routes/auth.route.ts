import express from "express";
import { authController } from "../controller/auth.controller";

const authRoute = express.Router();

authRoute.get("/signin", authController.signin);
authRoute.get("/signup", authController.singup);

export default authRoute;
