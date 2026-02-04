import bodyParser from "body-parser";
import express from "express";
import authRoute from "./routes/auth.route";
import { globalErrorMiddleware } from "./middlewares/error.middleware";
import { config } from "dotenv";

const app = express();

config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);

app.use(globalErrorMiddleware);

export default app;
