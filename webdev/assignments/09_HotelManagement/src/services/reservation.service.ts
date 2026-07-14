import { stat } from "node:fs";
import { RatePlan } from "../models/RatePlan.model";
import { Reservation } from "../models/Reservation.model";
import { Room } from "../models/Room.model";
import { AppError } from "../utils/AppError";
import { generateConfirmationNumber } from "../utils/GenerateConfirmation";
import {
  CreateReservationInputType,
  SearchAvailabilityInputType,
  SearchQueryInputType,
} from "../validators/reservation.validator";
import mongoose from "mongoose";

const searchAvailability = async (input: SearchAvailabilityInputType) => {
  const { property, checkIn, checkOut } = input;

  // !finding already booked  rooms
  const alreadyBookedRoomsId = await Reservation.find({
    property,
    status: { $nin: ["departed", "cancelled", "noshow"] },
    $or: [{ checkIn: { $lt: checkOut } }, { checkOut: { $gt: checkIn } }],
  }).distinct("room");

  // !finding available rooms
  const availableRooms = await Room.find({
    property,
    _id: { $nin: alreadyBookedRoomsId },
    isActive: true,
  });

  const availableRoomTypeIds = [
    ...new Set(availableRooms.map((r) => String(r.roomType))),
  ];

  const ratePlans = await RatePlan.find({
    property,
    startDate: { $lt: checkIn },
    endDate: { $gt: checkOut },
    isActive: true,
    "roomTypes.roomType": { $in: availableRoomTypeIds },
  });

  return ratePlans;
};

const create = async (input: CreateReservationInputType, createdBy: string) => {
  const {
    guest,
    property,
    ratePlan,
    roomType,
    checkIn,
    checkOut,
    adults,
    children,
    specialRequests,
    source,
  } = input;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (checkIn < today)
    throw new AppError(400, "Checkin date should be today or in the future.");

  const existingRatePlan = await RatePlan.findById(ratePlan);

  if (!existingRatePlan)
    throw new AppError(404, "Rate plan with this code doesn't exists");

  const roomTypeEntry = existingRatePlan.roomTypes.find(
    (r) => String(r.roomType) === roomType,
  );

  if (!roomTypeEntry)
    throw new AppError(404, "Room type not found in this rate plan");

  const bookedRoomIds = await Reservation.find({
    property,
    status: { $nin: ["cancelled", "noshow", "departed"] },
    $or: [{ checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } }],
  }).distinct("room");

  const availableRoom = await Room.findOne({
    property,
    roomType,
    isActive: true,
    _id: { $nin: bookedRoomIds },
  });

  if (!availableRoom)
    throw new AppError(
      400,
      "No rooms available for this room type on selected dates",
    );

  const nights = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
  );
  const pricePerNight = roomTypeEntry.pricePerNight;
  const totalAmount = nights * pricePerNight;

  const confirmationNo = await generateConfirmationNumber();

  const reservation = await Reservation.create({
    guest,
    property,
    roomType,
    ratePlan,
    checkIn,
    checkOut,
    nights,
    adults,
    children,
    pricePerNight,
    totalAmount,
    specialRequests,
    confirmationNo,
    source,
    createdBy,
  });

  return reservation;
};

const getAll = async (property: string, status: SearchQueryInputType) => {
  let query: any = {};
  if (status) query.status = status;

  const reservations = await Reservation.find({ property, ...query });

  return reservations;
};

const getById = async (id: string) => {
  const reservation = await Reservation.findById(id).populate([
    {
      path: "guest",
      select: "firstName lastName email phone",
    },
    {
      path: "room",
      select: "roomNumber",
    },
    {
      path: "roomType",
      select: "code name features",
      populate: [
        {
          path: "property",
          select: "name city email",
        },
      ],
    },
  ]);

  if (!reservation)
    throw new AppError(404, "Reservation with this id not found.");

  return reservation;
};

const checkIn = async (id: string) => {};

const checkOut = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const reservation = await Reservation.findOneAndUpdate(
        { _id: id, status: "inhouse" },
        {
          status: "departed",
        },
        { new: true, session },
      );
      if (!reservation) throw new AppError(404, "Reservation not found.");
      const room = await Room.findByIdAndUpdate(
        reservation.room,
        {
          status: "dirty",
        },
        {
          new: true,
          session,
        },
      );
    });
    return "Checkout Successful";
  } catch (error) {
    throw new AppError(500, "Error while checking the guest out.");
  } finally {
    session.endSession();
  }
};

const cancel = async (id: string) => {
  const reservation = await Reservation.findOneAndUpdate(
    {
      _id: id,
      status: { $in: ["departed", "cancelled", "inhouse", "noshow"] },
    },
    {
      status: "cancelled",
    },
    { new: true },
  );

  if (!reservation)
    throw new AppError(500, "Unable to cancel the reservation.");

  return reservation;
};
const noshow = async (id: string) => {
  const reservation = await Reservation.findById(id);
  if (!reservation) throw new AppError(500, "Unable to find the reservation.");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (reservation.checkIn >= today) {
    throw new AppError(500, "Can't now show now");
  } else {
    const updatedReservation = Reservation.findByIdAndUpdate(
      id,
      { status: "cancelled" },
      { new: true },
    );
    return updatedReservation;
  }
};
export const reservationService = {
  create,
  searchAvailability,
  getAll,
  checkOut,
  noshow,
  checkIn,
  getById,
  cancel,
};
