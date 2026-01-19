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

export const addDsaQuestionInputSchema = z
  .object({
    title: z.string().min(5, "TITLE_TOO_SHORT"),

    description: z.string().min(20, "DESCRIPTION_TOO_SHORT"),

    tags: z
      .array(z.string().min(2, "TAG_TOO_SHORT"))
      .min(1, "AT_LEAST_ONE_TAG_REQUIRED")
      .max(5, "MAX_FIVE_TAGS_ALLOWED"),

    points: z.number().int("INVALID_POINTS").positive("INVALID_POINTS"),

    timeLimit: z
      .number()
      .int("INVALID_TIME_LIMIT")
      .min(500, "TIME_LIMIT_TOO_LOW") // ms
      .max(10000, "TIME_LIMIT_TOO_HIGH"),

    memoryLimit: z
      .number()
      .int("INVALID_MEMORY_LIMIT")
      .min(32, "MEMORY_LIMIT_TOO_LOW") // MB
      .max(1024, "MEMORY_LIMIT_TOO_HIGH"),

    testCases: z
      .array(
        z.object({
          input: z.string().min(1, "TESTCASE_INPUT_EMPTY"),
          expectedOutput: z.string().min(1, "TESTCASE_OUTPUT_EMPTY"),
          isHidden: z.boolean(),
        }),
      )
      .min(1, "AT_LEAST_ONE_TESTCASE_REQUIRED")
      .max(20, "MAX_TWENTY_TESTCASES_ALLOWED"),
  })
  .refine((data) => data.testCases.some((tc) => tc.isHidden === false), {
    message: "AT_LEAST_ONE_PUBLIC_TESTCASE_REQUIRED",
    path: ["testCases"],
  });

export type AddDsaQuestionInputType = z.infer<typeof addDsaQuestionInputSchema>;
