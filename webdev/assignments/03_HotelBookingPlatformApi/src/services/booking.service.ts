import { string } from "zod";
import { CreateBookingInputType } from "../@types/app/booking.types";
import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";
import { BookingStatus } from "../generated/prisma/enums";

export const createBookingService = async (
  input: CreateBookingInputType,
  role: string,
  customerId: string,
) => {
  const { roomId, checkInDate, checkOutDate, guests } = input;

  if (role.toLowerCase() != "customer") throw new AppError("FORBIDDEN", 403);

  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
    },
  });

  if (!room) throw new AppError("ROOM_NOT_FOUND", 404);

  const hotelId = room.hotelId;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  if (guests <= 0 || guests > room.maxOccupancy)
    throw new AppError("INVALID_CAPACITY", 400);

  const nights =
    (Number(new Date(checkOutDate)) - Number(new Date(checkInDate))) /
    (1000 * 60 * 60 * 24);
  const totalPrice: number = nights * Number(room.pricePerNight);

  const conflict = await prisma.booking.findFirst({
    where: {
      roomId,
      status: "CONFIRMED",
      checkInDate: { lt: checkOut },
      checkOutDate: { gt: checkIn },
    },
  });
  if (conflict) throw new AppError("ROOM_NOT_AVAILABLE", 400);

  const booking = await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.create({
      data: {
        userId: customerId,
        roomId,
        checkInDate,
        checkOutDate,
        guests,
        totalPrice,
        hotelId,
      },
    });
    return booking;
  });

  const data = {
    id: booking.id,
    userId: booking.userId,
    roomId: booking.roomId,
    hotelId: booking.hotelId,
    checkInDate: booking.checkInDate,
    checkOutDate: booking.checkOutDate,
    guests: booking.guests,
    totalPrice: totalPrice,
    status: booking.status,
    bookingDate: booking.bookingDate,
  };
  return data;
};

export const getBookingService = async (
  customerId: string,
  role: string,
  query: { status?: BookingStatus },
) => {
  if (role.toLowerCase() != "customer") throw new AppError("FORBIDDEN", 403);

  const booking = await prisma.booking.findMany({
    where: {
      ...(query?.status && { status: query.status }),
      userId: customerId,
    },
  });

  return booking;
};

export const cancelBookingService = async (
  bookingId: string,
  userId: string,
  role: string,
) => {
  if (role.toLowerCase() != "customer") throw new AppError("FORBIDDEN", 403);
  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
    },
  });
  if (!booking) throw new AppError("BOOKING_NOT_FOUND", 404);

  if (booking.userId != userId) throw new AppError("FORBIDDEN", 403);

  const now = new Date();
  const checkIn = new Date(booking.checkInDate);
  const hoursUntilCheckIn = (Number(checkIn) - Number(now)) / (1000 * 60 * 60);

  if (hoursUntilCheckIn < 24)
    throw new AppError("CANCELLATION_DEADLINE_PASSED", 400);

  if (booking.status == "CANCELLED")
    throw new AppError("ALREADY_CANCELLED", 400);

  const cancelledBooking = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: "CANCELLED",
      cancelledAt: now,
    },
    select: {
      id: true,
      status: true,
      cancelledAt: true,
    },
  });

  return cancelledBooking;
};
