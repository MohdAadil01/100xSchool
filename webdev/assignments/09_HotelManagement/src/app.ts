import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware";
import { authRouter } from "./routes/auth.route";
import { propertyRouter } from "./routes/property.route";
import { roomTypeRouter } from "./routes/roomType.route";
import { roomRouter } from "./routes/room.route";
import { ratePlanRouter } from "./routes/ratePlan.route";
import { reservationRouter } from "./routes/reservation.route";
import { guestRouter } from "./routes/guest.route";
import { reportRouter } from "./routes/reports.route";
import { authController } from "./controllers/auth.controller";
import { ENV } from "./config/env";

export const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [ENV.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);
app.use(cookieParser());

app.get("/", authController.heathCheck);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/properties", propertyRouter);
app.use("/api/v1/room-types", roomTypeRouter);
app.use("/api/v1/guests", guestRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/rate-plans", ratePlanRouter);
app.use("/api/v1/reservations", reservationRouter);
app.use("/api/v1/reports", reportRouter);

app.use(errorHandler);
