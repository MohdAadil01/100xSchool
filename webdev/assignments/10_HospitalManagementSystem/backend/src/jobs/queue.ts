import { Queue } from "bullmq";
import { ENV } from "../config/env.config";

const slotGenerationQueue = new Queue("slots");

export const reminderEmailQueue = new Queue("reminders");
