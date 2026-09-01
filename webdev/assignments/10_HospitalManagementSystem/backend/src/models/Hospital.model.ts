import mongoose, { Document } from "mongoose";

interface IHospital extends Document {
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  isActive: boolean;
}

const hospitalSchema = new mongoose.Schema<IHospital>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    address: {
      type: String,
      required: true,
      minlength: 3,
    },
    city: {
      type: String,
      required: true,
      minlength: 2,
    },
    country: {
      type: String,
      required: true,
      minlength: 2,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const Hospital = mongoose.model<IHospital>("Hospital", hospitalSchema);
