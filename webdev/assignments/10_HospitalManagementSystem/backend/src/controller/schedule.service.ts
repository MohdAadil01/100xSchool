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
    $or: [{ startTime: { $lte: endTime } }],
  });

  if (existingSchedule)
    throw new AppError(409, "Doctor has already created dotor scheduled");

  const session = await mongoose.startSession();

  const dId = new mongoose.Types.ObjectId(doctor);
  const hId = new mongoose.Types.ObjectId(hospital);
  try {
    return session.withTransaction(async () => {
      const schedule = await DoctorSchedule.create(
        [
          {
            doctor: dId,
            hospital: hId,
            workingDays,
            startTime,
            endTime,
            slotDuration,
          },
        ],
        { session },
      );

      slotGenerationQueue.add("generateSlot", {
        doctor,
        hospital,
        workingDays,
        startTime,
        endTime,
        slotDuration,
        daysAhead: 1,
      });
      return schedule;
    });
  } catch (error) {
    console.log("Error in generating schedule " + error);
    return;
  } finally {
    session.endSession();
  }
};

export const scheduleService = {
  create,
};
