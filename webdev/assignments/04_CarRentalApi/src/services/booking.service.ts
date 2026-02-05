import {
  CreateBookingInputType,
  GetBookingInputType,
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

export const getUserBookingService = async (
  query: GetBookingInputType,
  userId: string,
) => {
  const { bookingId, summary } = query;
  if (bookingId) {
    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
      },
    });
    if (!booking) throw new AppError(404, "Booking not found.");

    return {
      id: booking?.id,
      carName: booking?.carName,
      days: booking?.days,
      rentPerDay: booking?.rentPerDay,
      status: booking?.status,
      totalCost: booking?.rentPerDay! * booking?.days!,
    };
  }
  if (summary == "true") {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        bookings: {
          where: {
            status: {
              in: ["booked", "completed"],
            },
          },
        },
      },
    });
    const totalBookings = user?.bookings.length ?? 0;
    const totalAmountSpent =
      user?.bookings.reduce((acc, b) => {
        return acc + b.days * b.rentPerDay;
      }, 0) ?? 0;

    return {
      userId,
      username: user?.username,
      totalBookings,
      totalAmountSpent,
    };
  }

  const bookings = await prisma.booking.findMany({
    where: {
      userId,
    },
  });
  return bookings.map((b) => ({
    id: b.id,
    car_name: b.carName,
    days: b.days,
    rent_per_day: b.rentPerDay,
    status: b.status,
    totalCost: b.days * b.rentPerDay,
  }));
};
