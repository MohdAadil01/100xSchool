import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import authRoute from "./routes/auth.route";
import courseRoute from "./routes/course.route";
import { globalErrorMiddleware } from "./middleware/error.middleware";
import lessionRoute from "./routes/lesson.route";
import purchaseRoute from "./routes/purchase.route";

config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/courses", courseRoute);

app.use("/api/v1/lessions", lessionRoute);

app.use("/api/v1", purchaseRoute);

app.use(globalErrorMiddleware);
export default app;
