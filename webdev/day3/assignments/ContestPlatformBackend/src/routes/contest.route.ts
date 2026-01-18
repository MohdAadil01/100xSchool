import { Router } from "express";
import { createContest } from "../controllers/contest.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const contestRoute = Router();

contestRoute.post("/", authMiddleware, createContest);

export default contestRoute;
