import { Queue } from "bullmq";
import { ENV } from "../config/env.config";
import { redisConnection } from "../config/redis";

export const slotGenerationQueue = new Queue("slot-generation", {
  connection: redisConnection,
});

export const reminderEmailQueue = new Queue("reminders", {
  connection: redisConnection,
});
