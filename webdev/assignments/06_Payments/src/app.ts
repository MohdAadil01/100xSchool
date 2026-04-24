import express from "express";
import { config } from "dotenv";
import authRouter from "./routes/auth.route";
import { accountRouter } from "./routes/account.route";
import { txnRouter } from "./routes/transaction.route";
import { globalErrorMiddleware } from "./middleware/error.middleware";

config();

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/account", accountRouter);
app.use("/api/v1/transaction", txnRouter);

app.use(globalErrorMiddleware);

export default app;
