import z from "zod";

export const createContestSchema = z.object({
  title: z.string().min(3, "Must be atleast 3 character long"),
  description: z.string().min(3, "Must be atleast 3 character long"),
  startTime: z.string().datetime("Invalid Start time"),
  endTime: z.string().datetime("Invalid end time"),
});

export type CreateContestInputType = z.infer<typeof createContestSchema>;
