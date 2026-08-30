import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  role:
    | "superadmin"
    | "admin"
    | "doctor"
    | "nurse"
    | "receptionist"
    | "patient";
  firstName: string;
  lastName: string;
  phone: string;
  isActive: boolean;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: [
        "superadmin",
        "admin",
        "doctor",
        "nurse",
        "receptionist",
        "patient",
      ],
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      minlength: 2,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
    },
    phone: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<IUser>("User", userSchema);
