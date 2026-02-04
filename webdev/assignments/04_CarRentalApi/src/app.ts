import bodyParser from "body-parser";
import express from "express";
import authRoute from "./routes/auth.route";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoute);

export default app;
