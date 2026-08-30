import z from "zod";

export const patientInputSchema = z.object({
  firstName: z.string().min(2, "At least 2 characters"),
  lastName: z.string().min(2, "At least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
  phone: z.string().min(1, "Phone is required"),
  dateOfBirth: z.coerce.date(),
  bloodGroup: z.string().optional(),
  emergencyContact: z.string().min(1, "Emergency contact is required"),
  medicalHistory: z.array(z.string()).default([]),
  allergies: z.array(z.string()).default([]),
});

export const staffInputSchema = z.object({
  firstName: z.string().min(2, "At least 2 characters"),
  lastName: z.string().min(2, "At least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
  phone: z.string().min(1, "Phone is required"),
  role: z.enum(["admin", "doctor", "nurse", "receptionist"]),
  hospital: z.string().optional(),

  specialization: z.string().optional(),
  qualification: z.string().optional(),
  experience: z.number().optional(),
  consultationFee: z.number().optional(),
  department: z.string().optional(),
});

export const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export type PatientInputType = z.infer<typeof patientInputSchema>;
export type StaffInputType = z.infer<typeof staffInputSchema>;
export type LoginInputType = z.infer<typeof loginInputSchema>;
