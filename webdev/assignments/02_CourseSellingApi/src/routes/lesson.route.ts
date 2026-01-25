import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createLession } from "../controller/lesson.controller";

const lessionRoute = Router();

lessionRoute.post("/", authMiddleware, createLession);

export default lessionRoute;
