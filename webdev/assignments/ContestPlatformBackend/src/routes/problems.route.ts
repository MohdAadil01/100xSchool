import { Router } from "express";
import {
  getDsaProblemWithVisibleTestCases,
  submitDsaProblem,
} from "../controllers/problem.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const problemRoutes = Router();

problemRoutes.get("/:problemId", getDsaProblemWithVisibleTestCases);
problemRoutes.post("/:problemId/submit", authMiddleware, submitDsaProblem);

export default problemRoutes;
