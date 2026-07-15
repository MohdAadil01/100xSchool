import mongoose from "mongoose";
import { AppError } from "../utils/AppError";

import { ENV } from "./env";

const MONGO_URI = ENV.MONGO_URI;

export const connectDb = async () => {
  if (!MONGO_URI) throw new AppError(404, "Mongo Url not found.");

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Database connected");
  } catch (error) {
    console.log("❌ Database Connection failed: " + error);
    process.exit(1);
  }
};
