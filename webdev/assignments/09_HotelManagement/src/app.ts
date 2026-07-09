import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";
import { authRouter } from "./routes/auth.route";

export const app = express();

app.use(express.json());
app.use(cors({}));

app.use("/api/v1/auth", authRouter);

app.use(errorHandler);
