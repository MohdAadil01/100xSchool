import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import authRoute from "./routes/auth.route";
import courseRoute from "./routes/course.route";
import { globalErrorMiddleware } from "./middleware/error.middleware";

config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/courses", courseRoute);

app.use(globalErrorMiddleware);
export default app;
