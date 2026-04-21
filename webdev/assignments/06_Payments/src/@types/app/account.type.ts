import z from "zod";
import { accountValidator } from "../../validators/account.validator";

export type CreateAccountInputType = z.infer<
  typeof accountValidator.createAccountInputSchema
>;
