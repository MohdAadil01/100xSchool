import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  addRoomToHotel,
  createHotel,
  getHotel,
  getHotels,
} from "../controller/hotel.controller";

const hotelRoute = Router();

hotelRoute.post("/", authMiddleware, createHotel);

hotelRoute.post("/:hotelId/rooms", authMiddleware, addRoomToHotel);

hotelRoute.get("/", authMiddleware, getHotels);
hotelRoute.get("/:hotelId", authMiddleware, getHotel);

export default hotelRoute;
