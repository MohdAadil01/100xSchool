import mongoose, { Document } from "mongoose";

interface IRoomTypePrice {
  roomType: mongoose.Types.ObjectId;
  pricePerNight: number;
}

export interface IRatePlan extends Document {
  code: string;
  name: string;
  description: string;
  property: mongoose.Types.ObjectId;
  roomTypes: IRoomTypePrice[];
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

const ratePlanSchema = new mongoose.Schema<IRatePlan>(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
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
    roomTypes: [
      {
        roomType: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "RoomType",
          required: true,
        },
        pricePerNight: {
          type: Number,
          required: true,
        },
      },
    ],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

ratePlanSchema.index({ code: 1, property: 1 }, { unique: true });

export const RatePlan = mongoose.model<IRatePlan>("RatePlan", ratePlanSchema);
