import mongoose, { Document } from "mongoose";

interface IReservation extends Document {
  guest: mongoose.Types.ObjectId;
  property: mongoose.Types.ObjectId;
  roomType: mongoose.Types.ObjectId;
  room?: mongoose.Types.ObjectId;
  ratePlan: mongoose.Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  adults: number;
  children: number;
  status:
    | "reserved"
    | "arrival"
    | "inhouse"
    | "departed"
    | "cancelled"
    | "noshow";
  source: "walkin" | "website" | "ota" | "phone" | "email";
  pricePerNight: number;
  totalAmount: number;
  specialRequests?: string;
  createdBy: mongoose.Types.ObjectId;
  confirmationNo: string;
}

const reservationSchema = new mongoose.Schema<IReservation>(
  {
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guest",
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    roomType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomType",
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      default: null,
    },
    ratePlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatePlan",
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    nights: {
      type: Number,
      required: true,
    },
    adults: {
      type: Number,
      default: 1,
    },
    children: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: [
        "reserved",
        "arrival",
        "inhouse",
        "departed",
        "cancelled",
        "noshow",
      ],
      default: "reserved",
    },
    source: {
      type: String,
      enum: ["walkin", "website", "ota", "phone", "email"],
      default: "phone",
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    specialRequests: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    confirmationNo: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Reservation = mongoose.model<IReservation>(
  "Reservation",
  reservationSchema,
);
