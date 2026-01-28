import {
  AddRoomToHotelInputType,
  CreateHotelInputType,
} from "../@types/app/hotel.types";
import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";

export const createHotelService = async (
  input: CreateHotelInputType & { role: string; ownerId: string },
) => {
  const { name, description, city, country, amenities, role, ownerId } = input;
  if (role.toLowerCase() != "owner") throw new AppError("FORBIDDEN", 403);

  const hotel = await prisma.hotel.create({
    data: {
      ownerId,
      name,
      description,
      city,
      country,
      amenities,
    },
  });

  return hotel;
};

export const addRoomToHotelService = async (
  input: AddRoomToHotelInputType & {
    ownerId: string;
    role: string;
  },
  hotelId: string,
) => {
  const { roomNumber, roomType, pricePerNight, maxOccupancy, ownerId, role } =
    input;

  if (role.toLowerCase() != "owner") throw new AppError("FORBIDDEN", 403);

  const existingHotel = await prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      rooms: true,
    },
  });
  if (!existingHotel) throw new AppError("HOTEL_NOT_FOUND", 404);
  if (existingHotel.ownerId != ownerId) throw new AppError("FORBIDDEN", 403);
  const existingRoom = await prisma.room.findUnique({
    where: {
      hotelId_roomNumber: {
        hotelId,
        roomNumber,
      },
    },
  });
  if (existingRoom) throw new AppError("ROOM_ALREADY_EXISTS", 400);

  const room = await prisma.room.create({
    data: {
      hotelId,
      roomNumber,
      roomType,
      pricePerNight,
      maxOccupancy,
    },
  });

  return room;
};
