import mongoose from "mongoose";

interface IPatient {
  user: mongoose.Types.ObjectId;
  dateOfBirth: Date;
  bloodGroup?: string;
  emergencyContact: string;
  medicalHistory?: string;
  allergies?: string;
}
const patientSchema = new mongoose.Schema<IPatient>({
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
    type: String,
  },
  allergies: {
    type: String,
  },
});

export const Patient = mongoose.model<IPatient>("Patient", patientSchema);
