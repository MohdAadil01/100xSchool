import express from "express";
import authRoute from "./routes/auth.routes";
import bodyParser from "body-parser";
import { globalErrorHandler } from "./middlewares/globarErrorHandler.middleware";
import contestRoute from "./routes/contest.route";
import problemRoutes from "./routes/problems.route";

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/auth", authRoute);
app.use("/api/contest", contestRoute);
app.use("/api/problems", problemRoutes);

app.use(globalErrorHandler);

export default app;
