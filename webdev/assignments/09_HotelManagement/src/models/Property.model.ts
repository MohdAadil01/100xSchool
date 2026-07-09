import mongoose, { Document } from "mongoose";

interface IProperty extends Document {
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  currency: "USD" | "INR" | "EUR" | "GBP" | "AED" | "SGD";
  timezone: string;
  isActive: boolean;
}

const propertySchema = new mongoose.Schema<IProperty>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      uppercase: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    currency: {
      type: String,
      required: true,
      enum: ["USD", "INR", "EUR", "GBP", "AED", "SGD"],
    },
    timezone: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Property = mongoose.model<IProperty>("Property", propertySchema);
