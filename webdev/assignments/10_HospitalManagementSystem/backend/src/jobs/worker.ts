import { Worker } from "bullmq";
import { worker } from "node:cluster";
import { generateSlots } from "../utils/slotGenerator";
import { redisConnection } from "../config/redis";
import { sendMail } from "../utils/sendEmail";
import { appointmentConfirmationEmailTemplate } from "../utils/emailTemplate";

const generateSlotWorker = new Worker(
  "slot-generation",
  async (job) => {
    await generateSlots(job.data);
  },
  {
    connection: redisConnection,
  },
);

const sendReminderWorker = new Worker("reminders", async (job) => {
  const {
    patientName,
    doctorName,
    specialization,
    appointmentDate,
    appointmentTime,
    hospitalName,
    hospitalAddress,
    appointmentId,
    hospitalEmail,
    patientEmail,
  } = job.data;

  const emailTemplate = appointmentConfirmationEmailTemplate({
    patientName,
    doctorName,
    specialization,
    appointmentDate,
    appointmentTime,
    hospitalName,
    hospitalAddress,
    appointmentId,
  });

  await sendMail({
    from: hospitalEmail,
    to: patientEmail,
    subject: emailTemplate.subject,
    text: emailTemplate.text,
    html: emailTemplate.html,
  });
});

generateSlotWorker.on("completed", (job) => {
  console.log(job.id + "is completed");
});

generateSlotWorker.on("failed", (job, err) => {
  console.log(job?.id + " is failed -> " + err);
});

sendReminderWorker.on("completed", (job) => {
  console.log(job.id + "is completed");
});

sendReminderWorker.on("failed", (job, err) => {
  console.log(job?.id + " is failed -> " + err);
});
