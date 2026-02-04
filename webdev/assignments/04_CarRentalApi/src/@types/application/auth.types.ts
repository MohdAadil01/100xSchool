import z from "zod";
import { authInputSchema } from "../../validators/auth.validator";

export type AuthInputType = z.infer<typeof authInputSchema>;
