import z from "zod";

export const hospitalInputSchema = z.object({
  name: z.string().min(3, "Hospital name should be atleast 3 characters long."),
  address: z
    .string()
    .min(3, "Address name should be atleast 3 characters long."),
  city: z.string().min(3, "City name should be atleast 3 characters long."),
  country: z
    .string()
    .min(3, "Country name should be atleast 3 characters long."),
  phone: z
    .string()
    .min(3, "Address name should be atleast 10 characters long."),
  email: z.email("Please enter a valid email"),
});

export const updateHospitalSchema = z.object({
  address: z
    .string()
    .min(3, "Address name should be atleast 3 characters long.")
    .optional(),
  city: z
    .string()
    .min(3, "City name should be atleast 3 characters long.")
    .optional(),
  phone: z
    .string()
    .min(3, "Address name should be atleast 10 characters long.")
    .optional(),
});

export type HospitalInputType = z.infer<typeof hospitalInputSchema>;

export type UpdateHospitalType = z.infer<typeof updateHospitalSchema>;
