import z from "zod";
import {
  loginInputSchema,
  signupInputSchema,
} from "../../validation/auth.validation";

export type SignupInputType = z.infer<typeof signupInputSchema>;

export type LoginInputType = z.infer<typeof loginInputSchema>;
