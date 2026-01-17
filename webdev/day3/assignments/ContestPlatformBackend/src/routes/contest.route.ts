import { Router } from "express";
import { getContest } from "../controllers/contest.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const contestRoute = Router();

contestRoute.get("/", authMiddleware, getContest);

export default contestRoute;
