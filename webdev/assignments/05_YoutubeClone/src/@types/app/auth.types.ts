import z from "zod";
import { authValidator } from "../../validators/auth.validator";

export type SignupInputType = z.infer<typeof authValidator.signupInputSchema>;
export type SigninInputType = z.infer<typeof authValidator.signinInputSchema>;
