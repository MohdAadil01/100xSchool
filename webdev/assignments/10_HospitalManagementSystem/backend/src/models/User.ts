import mongoose from "mongoose";

interface IUser {
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
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  role: {
    type: String,
    enum: ["superadmin", "admin", "doctor", "nurse", "receptionist", "patient"],
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    min: 2,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
  },
  phone: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model<IUser>("User", userSchema);
