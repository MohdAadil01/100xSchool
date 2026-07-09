import mongoose, { Document } from "mongoose";

interface IRoomType extends Document {
  code: string;
  name: string;
  description: string;
  property: mongoose.Types.ObjectId;
  bedType: "king" | "queen" | "double" | "twin" | "single";
  maxOccupancy: number;
  features: string[];
  isActive: boolean;
}

const roomTypeSchema = new mongoose.Schema<IRoomType>(
  {
    code: {
      type: String,
      uppercase: true,
      required: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    bedType: {
      type: String,
      enum: ["king", "queen", "double", "twin", "single"],
      required: true,
    },
    maxOccupancy: {
      type: Number,
      default: 2,
    },
    features: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

roomTypeSchema.index({ code: 1, property: 1 }, { unique: true });

export const RoomType = mongoose.model<IRoomType>("RoomType", roomTypeSchema);
