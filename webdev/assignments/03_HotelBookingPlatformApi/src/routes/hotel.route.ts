import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { addRoomToHotel, createHotel } from "../controller/hotel.controller";

const hotelRoute = Router();

hotelRoute.post("/", authMiddleware, createHotel);
hotelRoute.post("/:hotelId/rooms", authMiddleware, addRoomToHotel);

export default hotelRoute;
