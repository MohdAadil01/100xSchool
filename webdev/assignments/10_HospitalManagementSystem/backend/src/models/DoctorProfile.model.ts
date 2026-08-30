import mongoose, { Document } from "mongoose";

interface IDoctor extends Document {
  user: mongoose.Types.ObjectId;
  specialization: string;
  qualification: string;
  experience: number;
  consultationFee: number;
  department: mongoose.Types.ObjectId;
  hospital: mongoose.Types.ObjectId;
  isActive: boolean;
}
const doctorSchema = new mongoose.Schema<IDoctor>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    specialization: {
      type: String,
      required: true,
      minlength: 2,
    },
    qualification: {
      type: String,
      required: true,
      minlength: 2,
    },
    experience: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    consultationFee: {
      type: Number,
      required: true,
      default: 500,
      min: 100,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Doctor = mongoose.model<IDoctor>("Doctor", doctorSchema);
