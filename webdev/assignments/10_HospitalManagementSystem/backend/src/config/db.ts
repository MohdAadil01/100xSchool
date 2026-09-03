import mongoose from "mongoose";
import { ENV } from "./env.config";
import { AppError } from "../utils/AppError";

export const connectDb = async () => {
  try {
    if (ENV.DB_URI) throw new AppError(404, "Mongodb url not found.");

    await mongoose.connect(ENV.DB_URI);
    console.log("✅ Connected Database");
  } catch (error) {
    console.log("❌ Failed to connect Database. " + error);
    process.exit(1);
  }
};
