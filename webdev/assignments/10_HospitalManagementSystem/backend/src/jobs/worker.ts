import { Worker } from "bullmq";
import { worker } from "node:cluster";
import { generateSlots } from "../utils/slotGenerator";
import { redisConnection } from "../config/redis";

const generateSlotWorker = new Worker(
  "slot-generation",
  async (job) => {
    await generateSlots(job.data);
  },
  {
    connection: redisConnection,
  },
);

generateSlotWorker.on("completed", (job) => {
  console.log(job.id + "is completed");
});

generateSlotWorker.on("failed", (job, err) => {
  console.log(job?.id + " is failed -> " + err);
});
