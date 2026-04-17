import z from "zod";
import { userValidators } from "../../validators/user.validator";

export type SignupInput = z.infer<typeof userValidators.singupSchema>;

export type LoginInput = z.infer<typeof userValidators.loginSchema>;
