import z from "zod";

export const createContestSchema = z.object({
  title: z.string().min(3, "Must be atleast 3 character long"),
  description: z.string().min(3, "Must be atleast 3 character long"),
  startTime: z.string().datetime("Invalid Start time"),
  endTime: z.string().datetime("Invalid end time"),
});

export type CreateContestInputType = z.infer<typeof createContestSchema>;

export const addMcqToContestSchema = z
  .object({
    questionText: z.string().min(5, "QUESTION_TOO_SHORT"),
    options: z
      .array(z.string().min(1, "OPTION_EMPTY"))
      .min(2, "AT_LEAST_TWO_OPTIONS_REQUIRED")
      .max(6, "MAX_SIX_OPTIONS_ALLOWED"),
    correctOptionIndex: z
      .number()
      .int("INVALID_CORRECT_OPTION_INDEX")
      .nonnegative("INVALID_CORRECT_OPTION_INDEX"),
    points: z.number().int("INVALID_POINTS").positive("INVALID_POINTS"),
  })
  .refine(
    (data) =>
      data.correctOptionIndex >= 0 &&
      data.correctOptionIndex < data.options.length,
    {
      message: "CORRECT_OPTION_INDEX_OUT_OF_RANGE",
      path: ["correctOptionIndex"],
    },
  );

export type AddMcqToContestInputType = z.infer<typeof addMcqToContestSchema>;

export const submitMcqQuestionSchema = z.object({
  selectedOptionIndex: z
    .number()
    .int("INVALID_OPTION_INDEX")
    .nonnegative("INVALID_OPTION_INDEX"),
});

export type SubmitMcqQuestionType = z.infer<typeof submitMcqQuestionSchema>;
