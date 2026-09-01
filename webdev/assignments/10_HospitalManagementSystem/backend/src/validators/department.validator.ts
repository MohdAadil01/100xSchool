import z from "zod";

export const createDepartmentInputSchema = z.object({
  name: z
    .string()
    .min(3, "Department name should be atleast 3 characters long."),
  description: z
    .string()
    .min(3, "Address name should be atleast 3 characters long."),
  hospital: z.string(),
});

export const updateDepartmentInputSchema = z.object({
  name: z
    .string()
    .min(3, "Department name should be atleast 3 characters long.")
    .optional(),
  description: z
    .string()
    .min(3, "Address name should be atleast 3 characters long.")
    .optional(),
});

export type CreateDepartmentInputType = z.infer<
  typeof createDepartmentInputSchema
>;

export type UpdateDepartmentInputType = z.infer<
  typeof updateDepartmentInputSchema
>;
