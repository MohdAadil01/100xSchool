import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";

const purchaseRoute = Router();

purchaseRoute.post("/purchases", authMiddleware);
purchaseRoute.get("/users/:userId/purchases", authMiddleware);

export default purchaseRoute;
