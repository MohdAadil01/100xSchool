import nodemailer from "nodemailer";
import { ENV } from "../config/env.config";
import { AppError } from "./AppError";

const transporter = nodemailer.createTransport({
  host: ENV.EMAIL_HOST,
  port: ENV.EMAIL_PORT,
  secure: ENV.NODE_ENV === "production" ? true : false,
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,
  },
});

export const verifyEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log("Mail Server is ready to take our messages");
  } catch (error) {
    throw new AppError(400, "Mail Verification failed: " + error);
  }
};

export const sendMail = async (input: {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}) => {
  try {
    await transporter.sendMail(input);
    console.log("✅ Email sent...");
  } catch (error) {
    throw new AppError(400, "Error while sending the mail " + error);
  }
};
