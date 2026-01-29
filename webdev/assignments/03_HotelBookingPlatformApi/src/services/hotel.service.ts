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

export const getHotelsService = async (query: {
  city?: string;
  country?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}) => {
  const hotels = await prisma.hotel.findMany({
    where: {
      ...(query.city && {
        city: {
          equals: query.city,
          mode: "insensitive",
        },
      }),
      ...(query.country && {
        country: {
          equals: query.country,
          mode: "insensitive",
        },
      }),
      ...(query.minRating && {
        rating: {
          gte: query.minRating,
        },
      }),
    },
    include: {
      rooms: {
        where: {
          ...(query.minPrice && {
            pricePerNight: { gte: query.minPrice },
          }),
          ...(query.maxPrice && {
            pricePerNight: {
              lte: query.maxPrice,
            },
          }),
        },
        select: {
          pricePerNight: true,
        },
      },
    },
  });

  const data = hotels
    .filter((hotel) => hotel.rooms.length > 0)
    .map((hotel) => {
      const minPricePerNight = Math.min(
        ...hotel.rooms.map((r) => Number(r.pricePerNight)),
      );

      return {
        id: hotel.id,
        name: hotel.name,
        description: hotel.description,
        city: hotel.city,
        country: hotel.country,
        amenities: hotel.amenities,
        rating: hotel.rating,
        totalReviews: hotel.totalReviews,
        minPricePerNight,
      };
    });

  return data;
};

export const getHotelService = async (hotelId: string, ownerId: string) => {
  const hotel = await prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    select: {
      id: true,
      ownerId: true,
      name: true,
      description: true,
      city: true,
      country: true,
      amenities: true,
      rating: true,
      totalReviews: true,
      rooms: {
        select: {
          id: true,
          roomNumber: true,
          roomType: true,
          pricePerNight: true,
          maxOccupancy: true,
        },
      },
    },
  });
  if (!hotel) throw new AppError("HOTEL_NOT_FOUND", 404);
  if (hotel.ownerId != ownerId) throw new AppError("UNAUTHORIZED", 401);

  return hotel;
};
