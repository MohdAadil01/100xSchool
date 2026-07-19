import mongoose from "mongoose";
import { Reservation } from "../models/Reservation.model";
import { Room } from "../models/Room.model";

const getOccupancyRate = async (propertyId: string) => {
  // occupancy rate => (total rooms with occupied status) / total rooms in that property
  const rooms = await Room.aggregate([
    {
      $match: {
        property: new mongoose.Types.ObjectId(propertyId),
        isActive: true,
      },
    },
    {
      $group: {
        _id: null,
        totalRooms: { $sum: 1 },
        occupiedRooms: {
          $sum: {
            $cond: [{ $eq: ["$status", "occupied"] }, 1, 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalRooms: 1,
        occupiedRooms: 1,
        occupancyRate: {
          $multiply: [{ $divide: ["$occupiedRooms", "$totalRooms"] }, 100],
        },
      },
    },
  ]);

  return rooms[0] || { totalRooms: 0, occupiedRooms: 0, occupancyRate: 0 };
};

const getTodayArrivals = async (propertyId: string) => {
  const today = new Date();
  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  const arrivals = await Reservation.aggregate([
    {
      $match: {
        property: new mongoose.Types.ObjectId(propertyId),
        status: { $in: ["reserved", "arrival"] },
        checkIn: { $gte: startOfDay, $lte: endOfDay },
      },
    },
    {
      $lookup: {
        from: "guests",
        localField: "guest",
        foreignField: "_id",
        as: "guestDetails",
      },
    },
    {
      $project: {
        confirmationNo: 1,
        checkIn: 1,
        checkOut: 1,
        nights: 1,

        adults: 1,
        children: 1,
        status: 1,
        roomType: 1,
        guestDetails: {
          firstName: 1,
          lastName: 1,
          phone: 1,
          membershipType: 1,
        },
      },
    },
    {
      $sort: { checkIn: 1 },
    },
  ]);
  return arrivals;
};

const getMonthlyRevenue = async (propertyId: string) => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  const revenue = await Reservation.aggregate([
    {
      $match: {
        property: new mongoose.Types.ObjectId(propertyId),
        checkOut: { $gte: startOfMonth, $lt: endOfMonth },
        status: "departed",
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalAmount" },
        totalReservations: { $count: {} },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
        totalReservations: 1,
      },
    },
  ]);

  return revenue[0] || { totalRevenue: 0, totalReservations: 0 };
};

export const reportService = {
  getOccupancyRate,
  getTodayArrivals,
  getMonthlyRevenue,
};
