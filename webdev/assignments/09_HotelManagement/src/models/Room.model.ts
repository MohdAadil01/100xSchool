import mongoose, { Document } from "mongoose";

interface IRoom extends Document {
  roomNumber: string;
  floor: number;
  roomType: mongoose.Types.ObjectId;
  property: mongoose.Types.ObjectId;
  status: "clean" | "dirty" | "occupied" | "outoforder" | "outofservice";
  isActive: boolean;
}

const roomSchema = new mongoose.Schema<IRoom>(
  {
    roomNumber: {
      type: String,
      required: true,
      trim: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    roomType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomType",
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    status: {
      type: String,
      enum: ["clean", "dirty", "occupied", "outoforder", "outofservice"],
      default: "clean",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

roomSchema.index({ roomNumber: 1, property: 1 }, { unique: true });

export const Room = mongoose.model<IRoom>("Room", roomSchema);
