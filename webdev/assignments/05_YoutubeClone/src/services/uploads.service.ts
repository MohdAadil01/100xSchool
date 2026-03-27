import { UploadInputType } from "../@types/app/upload.types";
import { prisma } from "../lib/prisma";
import { AppError } from "../utils/Error";

const upload = async (input: UploadInputType, userId: string) => {
  const { videoUrl, thumbnail } = input;

  console.log(userId);

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

export const uploadService = {
  upload,
  remove,
  getAll,
  getSingle,
};
