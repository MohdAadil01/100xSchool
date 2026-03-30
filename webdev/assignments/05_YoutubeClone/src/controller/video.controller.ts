import { Request, Response } from "express";
import { AsyncHandler } from "../utils/AsyncHandler";
import { videoService } from "../services/video.service";
import { ApiResponse } from "../utils/ApiResponse";

const getRecommendations = AsyncHandler(async (req: Request, res: Response) => {
  const data = await videoService.getRecommendations();
  return res.status(200).json(ApiResponse.success(200, data));
});

const getSingleVideo = AsyncHandler(async (req: Request, res: Response) => {
  const { videoId } = req.params;
  const data = await videoService.getSingleVideo(String(videoId));
  return res.status(200).json(ApiResponse.success(200, data));
});

export const videoController = {
  getRecommendations,
  getSingleVideo,
};
