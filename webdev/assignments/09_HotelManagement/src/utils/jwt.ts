import jwt from "jsonwebtoken";
import { AppError } from "./AppError";

export const generateToken = (input: {
  id: string;
  role: string;
  propertyId: string | null;
}) => {
  try {
    if (!process.env.JWT_SECRET)
      throw new AppError(404, "Jwt secret not found");

    const token = jwt.sign(input, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    return token;
  } catch (error) {
    throw new AppError(500, "Error while generating token " + error);
  }
};
