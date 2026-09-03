import z from "zod";

export const appointmentInputSchema = z.object({
  slot: z.string(),
  patient: z.string(),
  doctor: z.string(),
  hospital: z.string(),
  reason: z.string(),
  symptoms: z.array(z.string()).default([]),
  notes: z.string().optional(),
  createdBy: z.string(),
});

export type AppointmentInputType = z.infer<typeof appointmentInputSchema>;
