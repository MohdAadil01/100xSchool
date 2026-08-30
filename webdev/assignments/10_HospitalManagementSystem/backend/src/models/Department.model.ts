import mongoose, { Document } from "mongoose";

interface IDepartment extends Document {
  name: string;
  description: string;
  hospital: mongoose.Types.ObjectId;
  isActive: boolean;
}

const departmentSchema = new mongoose.Schema<IDepartment>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    description: {
      type: String,
      required: true,
      minlength: 2,
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const Department = mongoose.model<IDepartment>(
  "Department",
  departmentSchema,
);
