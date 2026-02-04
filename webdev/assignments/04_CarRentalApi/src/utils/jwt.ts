import jwt from "jsonwebtoken";
import { string } from "zod";

export const generateToken = (input: { id: string; username: string }) => {
  const token = jwt.sign(input, process.env.JWT_SECRET!, {
    expiresIn: "10d",
  });

  return token;
};
