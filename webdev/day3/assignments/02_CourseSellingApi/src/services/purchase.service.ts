import prisma from "../lib/prisma";
import { AppError } from "../utils/AppError";

export const createPurchaseService = async (
  role: string,
  userId: string,
  courseId: string,
) => {
  if (role.toLowerCase() != "student") throw new AppError("Unauthorized", 403);

  return await prisma.$transaction(async (tx) => {
    const course = await tx.course.findUnique({
      where: {
        id: courseId,
      },
    });
    if (!course) throw new AppError("Course not found.", 404);

    if (course.instructorId == userId) throw new AppError("Unauthorized", 403);

    const existingPurchase = await tx.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });
    if (existingPurchase) throw new AppError("Course already purchased", 409);

    const purchase = await tx.purchase.create({
      data: {
        userId,
        courseId,
      },
    });

    return purchase;
  });
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
