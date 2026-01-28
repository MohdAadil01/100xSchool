import { CreateHotelInputType } from "../@types/app/hote.types";
import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";

export const createHotel = async (
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
