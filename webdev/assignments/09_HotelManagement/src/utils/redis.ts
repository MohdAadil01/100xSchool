import Redis from "ioredis";
import { ENV } from "../config/env";

// export const redis = new Redis({
//   host: ENV.REDIS_HOST,
//   port: ENV.REDIS_PORT,
//   password: ENV.REDIS_PASSWORD,
//   tls: {},
// });

export const redis = new Redis(ENV.REDIS_URL, {
  tls: {},
});
redis.on("connect", () => {
  console.log("✅ Redis connected");
});
redis.on("error", (err) => {
  console.error("❌ Redis error: " + err);
});
