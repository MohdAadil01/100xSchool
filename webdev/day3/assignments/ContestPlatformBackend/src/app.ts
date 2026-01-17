import express from "express";
import authRoute from "./routes/auth.routes";

const app = express();

app.use("/api/auth", authRoute);

export default app;
