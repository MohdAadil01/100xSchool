import { Router } from "express";
import {
  addDsaQuestion,
  addMcqToContest,
  createContest,
  getContestById,
  getContestLeaderboard,
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

contestRoute.post("/:contestId/dsa", authMiddleware, addDsaQuestion);

contestRoute.get(
  "/:contestId/leaderboard",
  authMiddleware,
  getContestLeaderboard,
);

export default contestRoute;
