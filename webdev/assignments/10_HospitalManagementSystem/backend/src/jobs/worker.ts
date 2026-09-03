import { Worker } from "bullmq";
import { worker } from "node:cluster";

const generateSlotWorker = new Worker("slots", async (job) => {
  console.log(job.data);
});

generateSlotWorker.on("completed", (job) => {
  console.log(job.id + "is completed");
});

generateSlotWorker.on("failed", (job, err) => {
  console.log(job?.id + " is failed -> " + err);
});
