import express from "express";
import { globalError } from "./middlewares/globalError.middleware";
import authRoute from "./routes/auth.route";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoute);

app.use(globalError);

export default app;
