import { prisma } from "../lib/prisma";
import { AppError } from "../utils/Error";

const getRecommendations = async () => {
  const allVideos = await prisma.upload.findMany({
    include: {
      user: true,
    },
  });
  return allVideos;
};

const getSingleVideo = async (videoId: string) => {
  if (!videoId) {
    throw new AppError(404, "Video Id not found.");
  }
  const video = await prisma.upload.findFirst({
    where: {
      id: videoId,
    },
  });
  if (!video) {
    throw new AppError(404, "Video not found.");
  }
  return video;
};

export const videoService = {
  getRecommendations,
  getSingleVideo,
};
