import { RatePlan } from "../models/RatePlan.model";
import { RoomType } from "../models/RoomType.model";
import { AppError } from "../utils/AppError";
import {
  AddRoomTypeInputType,
  CreateRatePlanInputType,
  RemoveRoomTypeInputType,
  UpdateRatePlanInputType,
  UpdateRoomTypePriceInputtype,
} from "../validators/ratePlan.validator";

const create = async (input: CreateRatePlanInputType) => {
  const { code, name, description, property, roomTypes, startDate, endDate } =
    input;

  const existingRatePlan = await RatePlan.findOne({ code, property });
  if (existingRatePlan)
    throw new AppError(409, "Rate Plan already exists on this property");

  const ratePlan = await RatePlan.create({
    code,
    name,
    description,
    property,
    roomTypes,
    startDate,
    endDate,
  });

  return ratePlan;
};

const getAll = async (property: string) => {
  const ratePlans = await RatePlan.find({ property, isActive: true });
  return ratePlans;
};

const getById = async (id: string) => {
  const ratePlan = await RatePlan.findById(id);
  if (!ratePlan) throw new AppError(404, "Rate Plan not found.");

  return ratePlan;
};

const update = async (id: string, input: UpdateRatePlanInputType) => {
  const { name, description, startDate, endDate } = input;

  let query: any = {};
  if (name) query.name = name;
  if (description) query.description = description;
  if (startDate) query.startDate = startDate;
  if (endDate) query.endDate = endDate;

  const ratePlan = await RatePlan.findByIdAndUpdate(
    id,
    {
      $set: query,
    },
    { new: true },
  );

  if (!ratePlan) throw new AppError(404, "Rate Plan not found for this id");
  return ratePlan;
};

const addRoomType = async (id: string, input: AddRoomTypeInputType) => {
  const { roomType, pricePerNight } = input;
  const existingRoomType = await RatePlan.findOne({
    _id: id,
    roomTypes: { $elemMatch: { roomType } },
  });

  if (existingRoomType) throw new AppError(409, "Room Type already exists.");

  const ratePlan = await RatePlan.findByIdAndUpdate(
    id,
    {
      $push: {
        roomTypes: { roomType, pricePerNight },
      },
    },
    { new: true },
  );
  if (!ratePlan) throw new AppError(404, "Rate plan with this id not found.");
  return ratePlan;
};

const removeRoomType = async (id: string, input: RemoveRoomTypeInputType) => {
  const { roomType } = input;
  const ratePlan = await RatePlan.findByIdAndUpdate(
    id,
    {
      $pull: {
        roomTypes: { roomType },
      },
    },
    { new: true },
  );
  if (!ratePlan) throw new AppError(404, "Rate Plan not found.");
  return ratePlan;
};

const deactivate = async (id: string) => {
  const ratePlan = await RatePlan.findByIdAndUpdate(
    id,
    {
      $set: {
        isActive: false,
      },
    },
    { new: true },
  );

  if (!ratePlan) throw new AppError(404, "Rate Plan not found for this id");
  return ratePlan;
};

const updateRoomTypePrice = async (
  id: string,
  input: UpdateRoomTypePriceInputtype,
) => {
  const { roomType, pricePerNight } = input;
  const existingRoomType = await RatePlan.findOne({
    _id: id,
    roomTypes: { $elemMatch: { roomType } },
  });

  if (!existingRoomType)
    throw new AppError(404, "Either Room rate or room type not found");

  const ratePlan = await RatePlan.findOneAndUpdate(
    {
      _id: id,
      "roomTypes.roomType": roomType,
    },
    {
      $set: {
        "roomTypes.$.pricePerNight": pricePerNight,
      },
    },
    {
      new: true,
    },
  );
  if (!ratePlan) throw new AppError(404, "Rate plan not found");
  return ratePlan;
};

export const ratePlanService = {
  create,
  getAll,
  getById,
  update,
  addRoomType,
  removeRoomType,
  deactivate,
  updateRoomTypePrice,
};
