import z from "zod";

export const submitDSaProblemSchema = z.object({
  code: z.string().min(10, "CODE_TOO_SHORT"),
  language: z
    .string()
    .transform((l) => l.toLowerCase())
    .pipe(
      z.enum(["cpp", "java", "python", "javascript"], {
        error: () => ({ message: "UNSUPPORTED_LANGUAGE" }),
      }),
    ),
});
export type SubmitDsaProblemInputType = z.infer<typeof submitDSaProblemSchema>;
