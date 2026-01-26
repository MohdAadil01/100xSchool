import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";

const app = express();
config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export default app;
