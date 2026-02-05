import {
  CreateBookingInputType,
  UpdateBookingInputType,
} from "../@types/application/booking.types";
import { prisma } from "../lib/db";
import { AppError } from "../utils/Error";

export const createBookingService = async (
  input: CreateBookingInputType,
  userId: string,
) => {
  const { carName, days, rentPerDay, bookingDate } = input;
  const existingBooking = await prisma.booking.findUnique({
    where: {
      userId_bookingDate: {
        userId,
        bookingDate,
      },
    },
  });
  if (existingBooking) throw new AppError(400, "Booking already exists");
  const booking = await prisma.booking.create({
    data: {
      carName,
      days,
      rentPerDay,
      bookingDate,
      userId,
    },
  });

  const totalCost = days * rentPerDay;

  return {
    message: "Booking created successfully",
    bookingId: booking.id,
    totalCost: totalCost,
  };
};
