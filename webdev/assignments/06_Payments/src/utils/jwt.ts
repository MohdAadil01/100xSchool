import jwt from "jsonwebtoken";
import { string } from "zod";
import { AppError } from "./AppError";

export const generateToken = (data: { userId: string }) => {
  try {
    const token = jwt.sign(data, process.env.JWT_SECRET!, {
      expiresIn: "10d",
    });
    return token;
  } catch (error) {
    throw new AppError("Error while generating token", 400);
  }
};
