import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const res = await mongoose.connect(process.env.DB_URL!);
    console.log("Established Database connection.");
  } catch (error) {
    console.log("Error while connecting database");
    console.log(error);
  }
};
