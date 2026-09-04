import { AppointmentSlot } from "../models/AppointmentSlot.model";
import { AppError } from "../utils/AppError";

export const getAvailableSlots = async (doctor: string, date: string) => {
  if (!doctor || !date)
    throw new AppError(404, "Please provide date and doctor id.");

  const availableSlots = await AppointmentSlot.find({
    doctor,
    date,
    status: "available",
  });

  return availableSlots;
};

export const slotsService = {
  getAvailableSlots,
};
