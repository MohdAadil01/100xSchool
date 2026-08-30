import mongoose, { Document } from "mongoose";

interface IAppointment extends Document {
  slot: mongoose.Types.ObjectId;
  status: "scheduled" | "completed" | "cancelled" | "noshow";
  reason: string;
  symptoms: string[];
  notes?: string;
  payment: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
}

const appointmentSchema = new mongoose.Schema<IAppointment>(
  {
    slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AppointmentSlot",
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled", "noshow"],
      default: "scheduled",
    },
    reason: {
      type: String,
    },
    symptoms: {
      type: [String],
      default: [],
    },
    notes: {
      type: String,
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
