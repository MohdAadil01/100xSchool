import jwt from "jsonwebtoken";
import { string } from "zod";

export const generateToken = (id: string) => {
  try {
    const token = jwt.sign(string, process.env.JWT_SECRET!, {
      expiresIn: "10d",
    });
    return token;
  } catch (error) {
    console.log("Error while generating token " + error);
  }
};
