import mongoose from "mongoose";
import { AppError } from "../utils/AppError";

export const connectDb = async () => {
  try {
    if (!process.env.DB_URI) {
      throw new AppError(500, "DB_URI is not defined");
    }
    await mongoose.connect(process.env.DB_URI!);
    console.log("✅ Database Connected!");
  } catch (error) {
    console.log("❌ Database connection failed " + error);
    process.exit(1);
  }
};
