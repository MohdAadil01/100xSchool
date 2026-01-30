import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  cancelBooking,
  createBooking,
  getBooking,
} from "../controller/booking.controller";

const bookingRoute = Router();

bookingRoute.post("/", authMiddleware, createBooking);
bookingRoute.get("/", authMiddleware, getBooking);
bookingRoute.post("/:bookingId/cancel", authMiddleware, cancelBooking);
export default bookingRoute;
