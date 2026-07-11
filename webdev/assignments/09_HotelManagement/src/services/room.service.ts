import { Room } from "../models/Room.model";
import { AppError } from "../utils/AppError";
import {
  CreateRoomInputType,
  UpdateRoomInputType,
  UpdateRoomStatusInputType,
} from "../validators/room.validator";

const create = async (input: CreateRoomInputType) => {
  const { roomNumber, roomType, property, floor } = input;
  const existingRoom = await Room.findOne({ roomNumber, property });
  if (existingRoom)
    throw new AppError(409, "Room already exists on this property.");

  const room = await Room.create({
    roomNumber,
    roomType,
    property,
    floor,
  });

  return room;
};

const getAll = async (property: string) => {
  const rooms = await Room.find({ property, isActive: true });
  return rooms;
};

const getById = async (roomId: string) => {
  const room = await Room.findById(roomId);

  if (!room) throw new AppError(404, "Room not found.");

  return room;
};

const update = async (roomId: string, input: UpdateRoomInputType) => {
  const { roomNumber, floor } = input;
  let query: any = {};
  if (roomNumber) query.roomNumber = roomNumber;
  if (floor) query.floor = floor;

  const room = await Room.findByIdAndUpdate(
    roomId,
    {
      $set: query,
    },
    { new: true },
  );
  if (!room) throw new AppError(404, "Room not found.");

  return room;
};

const updateStatus = async (
  roomId: string,
  input: UpdateRoomStatusInputType,
) => {
  const { status } = input;

  const room = await Room.findByIdAndUpdate(
    roomId,
    { $set: { status } },
    { new: true },
  );

  if (!room) throw new AppError(404, "Room not found.");

  return room;
};

const deactivate = async (roomId: string) => {
  const room = await Room.findByIdAndUpdate(
    roomId,
    { $set: { isActive: false } },
    { new: true },
  );

  if (!room) throw new AppError(404, "Room not found.");

  return room;
};

export const roomService = {
  create,
  getAll,
  getById,
  update,
  updateStatus,
  deactivate,
};
