import { UploadInputType } from "../@types/app/upload.types";
import { prisma } from "../lib/prisma";
import { AppError } from "../utils/Error";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "../utils/S3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const upload = async (input: UploadInputType, userId: string) => {
  const { videoUrl, thumbnail } = input;

  const upload = await prisma.upload.create({
    data: {
      videoUrl,
      thumbnail,
      userId,
    },
  });

  return upload;
};

const remove = async (uploadId: string, userId: string) => {
  if (!uploadId) {
    throw new AppError(404, "ID not given.");
  }

  const upload = await prisma.upload.deleteMany({
    where: {
      id: uploadId,
      userId,
    },
  });

  if (upload.count === 0) {
    throw new AppError(404, "Uploaded video not found or unauthorized.");
  }

  return { message: "Successfully removed the video." };
};

const getAll = async (userId: string) => {
  const uploads = await prisma.upload.findMany({
    where: {
      userId,
    },
  });

  return uploads;
};

const getSingle = async (uploadId: string, userId: string) => {
  const upload = await prisma.upload.findFirst({
    where: {
      id: uploadId,
      userId,
    },
  });
  if (!upload) {
    throw new AppError(404, "Upload not found.");
  }
  return upload;
};

const getPresignedUrl = async () => {
  const videoPath = `videos/${Math.random()}.mp4`;
  const thumbnailPath = `images/${Math.random()}.mp4`;

  const putUrlVideo = await getSignedUrl(
    S3,
    new PutObjectCommand({
      Bucket: "youtube-clone",
      Key: videoPath,
      ContentType: "video/mp4",
    }),
    {
      expiresIn: 3600,
    },
  );

  const putUrlThumbnail = await getSignedUrl(
    S3,
    new PutObjectCommand({
      Bucket: "youtube-clone",
      Key: thumbnailPath,
      ContentType: "image/jpeg",
    }),
    { expiresIn: 3600 },
  );

  const getUrlVideo = `${process.env.R2_ACCESS_URL}/${videoPath}`;
  const getUrlThumbnail = `${process.env.R2_ACCESS_URL}/${thumbnailPath}`;

  return {
    putUrlVideo,
    putUrlThumbnail,
    getUrlVideo,
    getUrlThumbnail,
  };
};

export const uploadService = {
  upload,
  remove,
  getAll,
  getSingle,
  getPresignedUrl,
};
