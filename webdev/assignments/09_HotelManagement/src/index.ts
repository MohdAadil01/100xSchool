import "dotenv/config";

import { app } from "./app";
import { redis } from "./utils/redis";
import { connectDb } from "./config/db";
import { ENV } from "./config/env";

const PORT = ENV.PORT || 9090;

const start = async () => {
  await connectDb();
  await redis.ping();
  app.listen(PORT, () => {
    console.log("✅ Process started");
  });
};

start();
