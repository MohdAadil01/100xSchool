import express from "express";
import { config } from "dotenv";
import authRouter from "./routes/auth.route";

config();

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);

export default app;
