import mongoose from "mongoose";
import { slotGenerationQueue } from "../jobs/queue";
import { DoctorSchedule } from "../models/DoctorSchedule.model";
import { AppError } from "../utils/AppError";
import { CreateDoctorScheduleInputType } from "../validators/schedule.validator";

const create = async (input: CreateDoctorScheduleInputType) => {
  const { doctor, hospital, workingDays, startTime, endTime, slotDuration } =
    input;

  const existingSchedule = await DoctorSchedule.findOne({
    doctor,
    hospital,
    isActive: true,
  });

  if (existingSchedule)
    throw new AppError(409, "Doctor already has an active schedule");

  const dId = new mongoose.Types.ObjectId(doctor);
  const hId = new mongoose.Types.ObjectId(hospital);

  const schedule = await DoctorSchedule.create({
    doctor: dId,
    hospital: hId,
    workingDays,
    startTime,
    endTime,
    slotDuration,
  });

  await slotGenerationQueue.add("generateSlot", {
    doctor,
    hospital,
    workingDays,
    startTime,
    endTime,
    slotDuration,
    daysAhead: 30,
  });

  return schedule;
};

export const scheduleService = {
  create,
};
