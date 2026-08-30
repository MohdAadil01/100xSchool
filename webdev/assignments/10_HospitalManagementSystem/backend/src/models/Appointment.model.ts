import mongoose, { Document } from "mongoose";

interface IAppointment extends Document {
  slot: mongoose.Types.ObjectId;
  patient: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  hospital: mongoose.Types.ObjectId;
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
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
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

appointmentSchema.index({
  patient: 1,
  status: 1,
});

appointmentSchema.index({
  doctor: 1,
  status: 1,
});

export const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  appointmentSchema,
);
