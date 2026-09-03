import z from "zod";

export const createDoctorScheduleInputSchema = z.object({
  doctor: z.string(),
  hospital: z.string(),
  workingDays: z.array(z.string()).default(["monday", "tuesday", "wednesday"]),
  startTime: z.string().default("09:00"),
  endTime: z.string().default("17:00"),
  slotDuration: z.number().default(30),
});

export type CreateDoctorScheduleInputType = z.infer<
  typeof createDoctorScheduleInputSchema
>;
