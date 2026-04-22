import express from "express";
import { config } from "dotenv";
import authRouter from "./routes/auth.route";
import { accountRouter } from "./routes/account.route";

config();

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/account", accountRouter);

export default app;
