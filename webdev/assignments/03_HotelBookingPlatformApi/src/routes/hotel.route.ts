import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  addRoomToHotel,
  createHotel,
  getHotels,
} from "../controller/hotel.controller";

const hotelRoute = Router();

hotelRoute.post("/", authMiddleware, createHotel);

hotelRoute.post("/:hotelId/rooms", authMiddleware, addRoomToHotel);

hotelRoute.get("/", getHotels);

export default hotelRoute;
