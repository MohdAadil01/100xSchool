import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createBooking, getBooking } from "../controller/booking.controller";

const bookingRoute = Router();

bookingRoute.post("/", authMiddleware, createBooking);
bookingRoute.get("/", authMiddleware, getBooking);
export default bookingRoute;
