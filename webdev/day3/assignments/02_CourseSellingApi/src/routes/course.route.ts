import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getCourseByid,
  getCourses,
  updateCourse,
} from "../controller/course.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const courseRoute = Router();

courseRoute.post("/", authMiddleware, createCourse);
courseRoute.get("/", getCourses);
courseRoute.get("/:courseId", getCourseByid);
courseRoute.patch("/:courseId", authMiddleware, updateCourse);
courseRoute.delete("/:courseId", authMiddleware, deleteCourse);

export default courseRoute;
