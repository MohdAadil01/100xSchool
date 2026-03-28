import express from "express";
import { videoController } from "../controller/video.controller";

const videoRouter = express.Router();

videoRouter.get("/", videoController.getRecommendations);
videoRouter.get("/:videoId", videoController.getSingleVideo);

export default videoRouter;
