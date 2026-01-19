import { Router } from "express";
import {
  addMcqToContest,
  createContest,
  getContestById,
  submitMcqQuestion,
} from "../controllers/contest.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const contestRoute = Router();

contestRoute.post("/", authMiddleware, createContest);
contestRoute.get("/:id", authMiddleware, getContestById);
contestRoute.post("/:id/mcq", authMiddleware, addMcqToContest);

contestRoute.post(
  "/:contestId/mcq/:questionId",
  authMiddleware,
  submitMcqQuestion,
);
export default contestRoute;
