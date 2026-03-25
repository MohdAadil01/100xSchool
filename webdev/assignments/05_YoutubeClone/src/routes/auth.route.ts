import express from "express";
import { authController } from "../controller/auth.controller";

const authRoute = express.Router();

authRoute.post("/signin", authController.signin);
authRoute.post("/signup", authController.singup);

export default authRoute;
