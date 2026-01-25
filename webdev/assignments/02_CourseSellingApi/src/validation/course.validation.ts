import z from "zod";

export const createCourseInputSchema = z.object({
  title: z.string().min(4, "Title shoud be atlease 4 characters long."),
  description: z
    .string()
    .min(10, "Description should be atleast 10 characters long")
    .optional(),
  price: z.number().positive("Price can't be negative"),
});

export const courseIdInputSchema = z.object({
  courseId: z.uuid(),
});

export const updateCourseInputSchema = z.object({
  title: z
    .string()
    .min(4, "Title shoud be atlease 4 characters long.")
    .optional(),
  description: z
    .string()
    .min(10, "Description should be atleast 10 characters long")
    .optional(),
  price: z.number().positive("Price can't be negative").optional(),
});

export type CreateCourseInputType = z.infer<typeof createCourseInputSchema>;
export type CourseIdInputType = z.infer<typeof courseIdInputSchema>;
export type UpdateCourseInputType = z.infer<typeof updateCourseInputSchema>;
