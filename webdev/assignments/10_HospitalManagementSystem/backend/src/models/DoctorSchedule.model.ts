import mongoose, { Document } from "mongoose";

interface IDoctorSchedule extends Document {
  doctor: mongoose.Types.ObjectId;
  hospital: mongoose.Types.ObjectId;
  workingDays: string[];
  startTime: string;
  endTime: string;
  slotDuration: number;
  isActive: boolean;
}

const doctorScheduleSchema = new mongoose.Schema<IDoctorSchedule>(
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
    workingDays: {
      type: [String],
      default: ["monday", "tuesday", "wednesday"],
    },
    startTime: {
      type: String,
      default: "09:00",
      required: true,
    },
    endTime: {
      type: String,
      default: "17:00",
      required: true,
    },
    slotDuration: {
      type: Number,
      required: true,
      default: 30,
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

export const DoctorSchedule = mongoose.model<IDoctorSchedule>(
  "DoctorSchedule ",
  doctorScheduleSchema,
);
