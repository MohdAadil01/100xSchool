import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createReview } from "../controller/review.controller";

const reviewRoute = Router();

reviewRoute.post("/", authMiddleware, createReview);

export default reviewRoute;
