import mongoose, { Document } from "mongoose";

interface IPayment extends Document {
  appointment: mongoose.Types.ObjectId;
  patient: mongoose.Types.ObjectId;
  amount: number;
  currency: "INR" | "USD";
  status: "pending" | "completed" | "failed" | "refunded";
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  paidAt: Date;
}

const paymentSchema = new mongoose.Schema<IPayment>(
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
    amount: {
      type: Number,
      default: 500,
      required: true,
    },
    currency: {
      type: String,
      enum: ["INR", "USD"],
      default: "INR",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    razorpayOrderId: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
    },
    razorpaySignature: {
      type: String,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export const Payment = mongoose.model<IPayment>("Payment", paymentSchema);
