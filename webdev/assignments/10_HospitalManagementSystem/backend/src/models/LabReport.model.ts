import mongoose from "mongoose";

interface ILabReport {
  patient: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  appointment: mongoose.Types.ObjectId;
  hospital: mongoose.Types.ObjectId;

  reportType: "blood_test" | "xray" | "mri" | "urine" | "other";

  fileUrl: string;
  fileName: string;
  fileSize: number;

  uploadedBy: mongoose.Types.ObjectId;

  notes?: string;

  status: "pending" | "uploaded" | "reviewed";
}

const labReportSchema = new mongoose.Schema<ILabReport>(
  {
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

    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },

    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    reportType: {
      type: String,
      enum: ["blood_test", "xray", "mri", "urine", "other"],
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    notes: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "uploaded", "reviewed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

export const LabReport = mongoose.model<ILabReport>(
  "LabReport",
  labReportSchema,
);
