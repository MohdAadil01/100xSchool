import mongoose, { Document } from "mongoose";

interface IAppointmentSlot extends Document {
  doctor: mongoose.Types.ObjectId;
  hospital: mongoose.Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  status: "available" | "booked" | "cancelled" | "not-available";
  appointment?: mongoose.Types.ObjectId;
}

const appointmentSlotSchema = new mongoose.Schema<IAppointmentSlot>(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "booked", "cancelled"],
      required: true,
      default: "not-available",
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

appointmentSlotSchema.index({
  doctor: 1,
  date: 1,
});

appointmentSlotSchema.index({
  doctor: 1,
  date: 1,
  status: 1,
});

export const AppointmentSlot = mongoose.model<IAppointmentSlot>(
  "AppointmentSlot",
  appointmentSlotSchema,
);
