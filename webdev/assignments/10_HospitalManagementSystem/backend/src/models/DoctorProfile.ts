import mongoose from "mongoose";

interface IDoctor {
  user: mongoose.Types.ObjectId;
  specialization: string;
  qualification: string;
  experience: number;
  consulatationFee: number;
  department: mongoose.Types.ObjectId;
  hospital: mongoose.Types.ObjectId;
}
const doctorSchema = new mongoose.Schema<IDoctor>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  specialization: {
    type: String,
    required: true,
    min: 2,
  },
  qualification: {
    type: String,
    required: true,
    min: 2,
  },
  experience: {
    type: Number,
    required: true,
    default: 1,
  },
  consulatationFee: {
    type: Number,
    required: true,
    default: 500,
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
});

export const Doctor = mongoose.model<IDoctor>("Doctor", doctorSchema);
