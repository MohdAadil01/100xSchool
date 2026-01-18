import { Router } from "express";
import {
  addMcqToContest,
  createContest,
  getContestById,
} from "../controllers/contest.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const contestRoute = Router();

contestRoute.post("/", authMiddleware, createContest);
contestRoute.get("/:id", authMiddleware, getContestById);
contestRoute.post("/:id/mcq", authMiddleware, addMcqToContest);
export default contestRoute;
