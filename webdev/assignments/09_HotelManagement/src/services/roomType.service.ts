import { RoomType } from "../models/RoomType.model";
import { AppError } from "../utils/AppError";
import {
  CreateRoomTypeInputType,
  UpdateRoomTypeInputType,
} from "../validators/roomType.validator";

const create = async (input: CreateRoomTypeInputType) => {
  const { code, name, description, bedType, maxOccupancy, features, property } =
    input;

  const existingRoomType = await RoomType.findOne({ code, property });
  if (existingRoomType)
    throw new AppError(400, "Room Type already exists on this property");

  const roomType = await RoomType.create({
    code,
    name,
    description,
    bedType,
    maxOccupancy,
    features,
    property,
  });

  return roomType.toObject();
};

const getAll = async (property: string) => {
  const roomTypes = await RoomType.find({ property, isActive: true });
  return roomTypes;
};

const getById = async (id: string) => {
  const roomType = await RoomType.findById(id);
  if (!roomType) throw new AppError(404, "RoomType not found.");

  return roomType;
};

const update = async (input: UpdateRoomTypeInputType, id: string) => {
  const { code, name, description, bedType, maxOccupancy, features } = input;

  let query: any = {};
  if (code) query.code = code;
  if (name) query.name = name;
  if (description) query.description = description;
  if (bedType) query.bedType = bedType;
  if (maxOccupancy) query.maxOccupancy = maxOccupancy;
  if (features) query.features = features;

  const roomType = await RoomType.findByIdAndUpdate(
    id,
    {
      $set: query,
    },
    { new: true },
  );
  if (!roomType) throw new AppError(404, "Room Type not found");

  return roomType;
};

const deactivate = async (id: string) => {
  const roomType = await RoomType.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true },
  );

  if (!roomType) throw new AppError(404, "RoomType not found");

  return roomType.toObject();
};

export const roomTypeService = {
  create,
  getAll,
  getById,
  update,
  deactivate,
};
