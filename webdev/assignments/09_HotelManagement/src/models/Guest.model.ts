import mongoose, { Document } from "mongoose";

interface IGuest extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  idType: "passport" | "national_id" | "driving_license";
  idNumber: string;
  dateOfBirth: Date;
  address?: string;
  membershipType: "none" | "silver" | "gold" | "platinum";
  memberId?: string;
  notes?: string;
  property: mongoose.Types.ObjectId;
}

const guestSchema = new mongoose.Schema<IGuest>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
    },
    idType: {
      type: String,
      enum: ["passport", "national_id", "driving_license"],
      required: true,
    },
    idNumber: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    address: {
      type: String,

      trim: true,
    },
    membershipType: {
      type: String,
      enum: ["none", "silver", "gold", "platinum"],
      default: "none",
    },
    memberId: {
      type: String,

      trim: true,
    },
    notes: {
      type: String,

      trim: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
  },
  { timestamps: true },
);

export const Guest = mongoose.model<IGuest>("Guest", guestSchema);
