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
  medicines: IMedicine[];
  diagnosis: string;
  notes?: string;
  followUpDate?: Date;
}

const prescriptionSchema = new mongoose.Schema<IPrescription>(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
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
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export const Prescription = mongoose.model<IPrescription>(
  "Prescription",
  prescriptionSchema,
);
