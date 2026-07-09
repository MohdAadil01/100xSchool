import { app } from "./app";
import { config } from "dotenv";
import { connectDb } from "./config/db";

config();

const PORT = process.env.PORT || 9090;

const start = async () => {
  await connectDb();
  app.listen(PORT, () => {
    console.log("✅ Process started");
  });
};

start();
