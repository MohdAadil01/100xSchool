import prisma from "../lib/prisma";
import { AppError } from "../utils/AppError";

export const createPurchaseService = async (
  role: string,
  userId: string,
  courseId: string,
) => {
  if (role.toLowerCase() != "student") throw new AppError("Unauthorized", 403);
  let purchase;
  await prisma.$transaction(async (tx) => {
    purchase = await tx.purchase.create({
      data: {
        userId,
        courseId,
      },
    });
  });
  return purchase;
};

export const getUserPurchasesService = async (userId: string) => {
  if (!userId) throw new AppError("UserId not given", 404);
  const purchases = await prisma.purchase.findMany({
    where: {
      userId,
    },
  });
  return purchases;
};
