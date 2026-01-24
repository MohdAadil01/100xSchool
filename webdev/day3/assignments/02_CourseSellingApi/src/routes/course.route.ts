import { Router } from "express";
import { createCourse } from "../controller/course.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const courseRoute = Router();

courseRoute.post("/", authMiddleware, createCourse);

export default courseRoute;
