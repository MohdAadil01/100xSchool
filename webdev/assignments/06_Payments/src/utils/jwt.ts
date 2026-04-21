import jwt from "jsonwebtoken";
import { string } from "zod";

export const generateToken = (data: { userId: string }) => {
  try {
    const token = jwt.sign(data, process.env.JWT_SECRET!, {
      expiresIn: "10d",
    });
    return token;
  } catch (error) {
    console.log("Error while generating token " + error);
  }
};
