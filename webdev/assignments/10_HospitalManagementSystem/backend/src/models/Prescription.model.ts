import mongoose, { Document } from "mongoose";

interface IMedicine {
  name: string;
  dosage: string;
  frequency?: string;
  duration?: string;
  instructions?: string;
}
interface IPrescription extends Document {
  appointment: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  patient: mongoose.Types.ObjectId;
  medicines: IMedicine;
  diagnosis: string;
  notes?: string;
  followUpDate?: string;
}

const prescriptionSchema = new mongoose.Schema<IPrescription>({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  medicines: [
    {
      name: String,
      dosage: String,
      frequency: String,
      duration: String,
      instructions: String,
    },
  ],
  diagnosis: {
    type: String,
  },
  notes: {
    type: String,
  },
  followUpDate: {
    type: String,
  },
});

export const Prescription = mongoose.model<IPrescription>(
  "Prescription",
  prescriptionSchema,
);
