import express from "express";
import { authRouter } from "./routes/auth.route";
import cookieParser from "cookie-parser";

export const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", authRouter);
