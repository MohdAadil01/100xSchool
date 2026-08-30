import mongoose, { Document } from "mongoose";

interface IPatient extends Document {
  user: mongoose.Types.ObjectId;
  dateOfBirth: Date;
  bloodGroup?: string;
  emergencyContact: string;
  medicalHistory?: string[];
  allergies?: string[];
  isActive: boolean;
}
const patientSchema = new mongoose.Schema<IPatient>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    bloodGroup: {
      type: String,
    },
    emergencyContact: {
      type: String,
      required: true,
    },
    medicalHistory: {
      type: [String],
      default: [],
    },
    allergies: {
      type: [String],
      default: [],
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

export const Patient = mongoose.model<IPatient>("Patient", patientSchema);
