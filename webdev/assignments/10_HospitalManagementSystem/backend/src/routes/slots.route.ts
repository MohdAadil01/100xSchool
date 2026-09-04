import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { slotsController } from "../controller/slots.controller";

export const slotsRoute = Router();

slotsRoute.get("/:doctorId", authMiddleware, slotsController.availableSlots);
