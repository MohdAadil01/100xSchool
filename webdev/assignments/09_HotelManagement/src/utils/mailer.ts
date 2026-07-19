import nodemailer from "nodemailer";
import { ENV } from "../config/env";

export const transporter = nodemailer.createTransport({
  host: ENV.EMAIL_HOST,
  port: Number(ENV.EMAIL_PORT),
  secure: false,
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,
  },
});

export const sendMail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: `"${ENV.EMAIL_FROM_NAME}" <${ENV.EMAIL_USER}`,
    to,
    subject,
    html,
  });
};
