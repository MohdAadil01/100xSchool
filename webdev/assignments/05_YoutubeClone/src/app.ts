import express from "express";
import { globalError } from "./middlewares/globalError.middleware";
import authRoute from "./routes/auth.route";

const app = express();

app.use("/api/v1/auth/", authRoute);

app.use(globalError);

export default app;
