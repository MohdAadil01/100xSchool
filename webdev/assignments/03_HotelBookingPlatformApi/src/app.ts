import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import { globalErrorHandler } from "./middleware/globalError.middleware";
import authRoute from "./routes/auth.route";
import hotelRoute from "./routes/hotel.route";

const app = express();
config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// !using routes
app.use("/api/auth", authRoute);
app.use("/api", hotelRoute);

// !using middlewares
app.use(globalErrorHandler);

export default app;
