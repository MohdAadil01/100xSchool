import { Reservation } from "../models/Reservation.model";

export const generateConfirmationNumber = async () => {
  const date = new Date();
  const year = date.getFullYear();
  const count = await Reservation.countDocuments();
  const padded = String(count + 1).padStart(5, "0");
  const result = `HMS-${year}-${padded}`;
  return result;
  // HMS-2024-00123
};
