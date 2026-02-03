import jwt from "jsonwebtoken";
import { string } from "zod";

export const generateToken = jwt.sign(
  {
    id: string,
    username: string,
  },
  process.env.JWT_SECRET!,
  {
    expiresIn: "10d",
  },
);
