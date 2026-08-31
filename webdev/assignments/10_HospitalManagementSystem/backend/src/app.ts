import express from "express";
import { authRouter } from "./routes/auth.route";

export const app = express();

app.use("/api/v1", authRouter);
