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
      userId_bookingDate_status: {
        userId,
        bookingDate,
        status: "booked",
      },
    },
  });
  if (existingBooking && existingBooking.status == "booked")
    throw new AppError(400, "Booking already exists");

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

export const updateBookingService = async (
  input: UpdateBookingInputType,
  bookingId: string,
  userId: string,
) => {
  const { carName, rentPerDay, bookingDate, status } = input;
  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
    },
  });
  if (!booking) throw new AppError(404, "Booking not found.");
  if (booking.userId != userId)
    throw new AppError(403, "booking does not belong to user");

  const updatedBooking = await prisma.booking.update({
    where: {
      id: userId,
    },
    data: {
      ...(carName && { carName: carName }),
      ...(rentPerDay && { rentPerDay: rentPerDay }),
      ...(bookingDate && { bookingDate: bookingDate }),
      ...(status && { status: status }),
    },
  });

  return {
    message: "Booking updated",
    booking: {
      id: updatedBooking.id,
      carName: updatedBooking.carName,
      days: updatedBooking.days,
      rentPerDay: updatedBooking.rentPerDay,
      status: updatedBooking.status,
      totalCost: updatedBooking.days * updatedBooking.rentPerDay,
    },
  };
};
