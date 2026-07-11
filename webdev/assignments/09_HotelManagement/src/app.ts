import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";
import { authRouter } from "./routes/auth.route";
import { propertyRouter } from "./routes/property.route";
import { roomTypeRouter } from "./routes/roomType.route";
import { roomRouter } from "./routes/room.route";
import { ratePlanRouter } from "./routes/ratePlan.route";

export const app = express();

app.use(express.json());
app.use(cors({}));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/properties", propertyRouter);
app.use("/api/v1/roomType", roomTypeRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/rate-plan", ratePlanRouter);

app.use(errorHandler);
