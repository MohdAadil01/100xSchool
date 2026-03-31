import express from "express";
import cors from "cors";
import { globalError } from "./middlewares/globalError.middleware";
import authRoute from "./routes/auth.route";
import bodyParser from "body-parser";
import uploadRoute from "./routes/upload.route";
import videoRouter from "./routes/video.route";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({}));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/video/upload", uploadRoute);
app.use("/api/v1/videos", videoRouter);
app.use(globalError);

export default app;
