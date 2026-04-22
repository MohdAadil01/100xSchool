import mongoose from "mongoose";
import z from "zod";

const transferInputSchema = z.object({
  from: z.string().refine((x) => mongoose.Types.ObjectId.isValid(x), {
    message: "Invalid Sender id",
  }),
  to: z.string().refine((x) => mongoose.Types.ObjectId.isValid(x), {
    message: "Invalid Receiver id",
  }),
  amount: z.number().nonnegative("Number can't be negative").min(0),
  status: z
    .string()
    .transform((val) => val.toLowerCase())
    .pipe(z.enum(["pending", "completed", "failed"])),
});

export const txnValidator = {
  transferInputSchema,
};
