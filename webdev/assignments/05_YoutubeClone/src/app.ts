import express from "express";
import { globalError } from "./middlewares/globalError.middleware";

const app = express();

app.use(globalError);

export default app;
