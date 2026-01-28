import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createHotel } from "../controller/hotel.controller";

const hotelRoute = Router();

hotelRoute.post("/hotels", authMiddleware, createHotel);

export default hotelRoute;
