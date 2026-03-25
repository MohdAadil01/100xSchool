import { UploadInputType } from "../@types/app/upload.types";
import { prisma } from "../lib/prisma";
import { AppError } from "../utils/Error";

const upload = async (input: UploadInputType) => {
  const { videoUrl, thumbnail, userId } = input;

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

  await prisma.upload.delete({
    where: {
      id: uploadId,
      userId,
    },
  });

  if (!upload) {
    throw new AppError(404, "Uploaded video not found.");
  }

  return { message: "Successfully removed the video." };
};

const getAll = async (userId: string) => {
  const uploads = await prisma.upload.findMany({
    where: {
      userId,
    },
  });
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
