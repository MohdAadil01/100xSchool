import { config } from "dotenv";
config();

import app from "./app";
import { connectDb } from "./config/db";

const PORT = process.env.PORT || 9000;

const start = async () => {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`✅Application started to work on port ${PORT}`);
  });
};

start();
