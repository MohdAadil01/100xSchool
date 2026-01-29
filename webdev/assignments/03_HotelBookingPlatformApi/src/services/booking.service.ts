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
  if (room.status == "BOOKED") throw new AppError("ROOM_NOT_AVAILABLE", 400);

  const hotelId = room.hotelId;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  if (checkIn <= today || checkOut <= checkIn)
    throw new AppError("INVALID_DATES", 400);

  if (guests <= 0 || guests > 10) throw new AppError("INVALID_CAPACITY", 400);

  const nights =
    (Number(new Date(checkOutDate)) - Number(new Date(checkInDate))) /
    (1000 * 60 * 60 * 24);
  const totalPrice: number = nights * Number(room.pricePerNight);

  const alreadyBooked = await prisma.booking.findUnique({
    where: {
      userId_hotelId_roomId: {
        userId: customerId,
        roomId,
        hotelId,
      },
    },
  });
  if (alreadyBooked) throw new AppError("ROOM_NOT_AVAILABLE", 400);

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
