import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createBooking,
  deleteBooking,
  getBooking,
  updateBooking,
} from "../controllers/booking.controller";

const bookingRoute = Router();

bookingRoute.post("/", authMiddleware, createBooking);
bookingRoute.put("/:bookingId", authMiddleware, updateBooking);
bookingRoute.get("/", authMiddleware, getBooking);
bookingRoute.delete("/:bookingId", authMiddleware, deleteBooking);

export default bookingRoute;
