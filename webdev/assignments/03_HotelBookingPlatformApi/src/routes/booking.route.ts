import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createBooking } from "../controller/booking.controller";

const bookingRoute = Router();

bookingRoute.post("/bookings", authMiddleware, createBooking);

export default bookingRoute;
