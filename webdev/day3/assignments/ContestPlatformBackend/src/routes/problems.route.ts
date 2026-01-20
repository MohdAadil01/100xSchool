import { Router } from "express";
import { getDsaProblemWithVisibleTestCases } from "../controllers/problem.controller";

const problemRoutes = Router();

problemRoutes.get("/:problemId", getDsaProblemWithVisibleTestCases);

export default problemRoutes;
