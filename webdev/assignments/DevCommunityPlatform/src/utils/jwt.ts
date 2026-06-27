import jwt from "jsonwebtoken";
import { AppError } from "./AppError";

interface Data {
  id: string;
}
export const generateToken = (data: Data) => {
  try {
    const token = jwt.sign(data, process.env.JWT_SECRET!, {
      expiresIn: "10d",
    });
    return token;
  } catch (error) {
    console.log("Error while generating token " + error);
    throw new AppError(500, "Error while generating the token");
  }
};
