import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  createPurchase,
  getUserPurchases,
} from "../controller/purchase.controller";

const purchaseRoute = Router();

purchaseRoute.post("/purchases", authMiddleware, createPurchase);
purchaseRoute.get("/users/purchases", authMiddleware, getUserPurchases);

export default purchaseRoute;
