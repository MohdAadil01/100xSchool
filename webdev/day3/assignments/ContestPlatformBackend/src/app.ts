import express from "express";
import authRoute from "./routes/auth.routes";
import bodyParser from "body-parser";
import { globalErrorHandler } from "./middlewares/globarErrorHandler.middleware";

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/auth", authRoute);

app.use(globalErrorHandler);

export default app;
