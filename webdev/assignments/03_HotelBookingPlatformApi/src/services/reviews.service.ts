import { CreateReviewInputType } from "../@types/app/review.types";
import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";

export const createReviewService = async (
  input: CreateReviewInputType,
  role: string,
  customerId: string,
) => {
  const { bookingId, rating, comment } = input;
  if (role.toLowerCase() != "customer") throw new AppError("FORBIDDEN", 403);
  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
    },
    include: {
      reviews: true,
    },
  });
  if (!booking) throw new AppError("BOOKING_NOT_FOUND", 404);

  if (booking.userId != customerId) throw new AppError("FORBIDDEN", 403);

  const alreadyReviewed = await prisma.review.findUnique({
    where: {
      userId_bookingId: {
        userId: customerId,
        bookingId,
      },
    },
  });
  if (alreadyReviewed) throw new AppError("ALREADY_REVIEWED", 400);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkOut = new Date(booking.checkOutDate);
  const canReview = checkOut < today && booking.status == "CONFIRMED";
  if (!canReview) throw new AppError("BOOKING_NOT_ELIGIBLE", 400);

  const review = await prisma.review.create({
    data: {
      userId: customerId,
      hotelId: booking.hotelId,
      bookingId,
      rating,
      comment,
    },
  });

  return review;
};
