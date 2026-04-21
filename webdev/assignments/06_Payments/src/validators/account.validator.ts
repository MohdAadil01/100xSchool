import mongoose from "mongoose";
import z from "zod";

const createAccountInputSchema = z.object({
  userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  }),
  balance: z
    .number()
    .min(0)
    .nonnegative("balance can't be negative")
    .optional(),
});

export const accountValidator = {
  createAccountInputSchema,
};
