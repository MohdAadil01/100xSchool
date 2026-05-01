import { Router } from "express";
import { problemController } from "../controller/problem.controller";

const router = Router();

router.post("/submit", problemController.submit);

router.get("/progress", problemController.getProgress);

export default router;
