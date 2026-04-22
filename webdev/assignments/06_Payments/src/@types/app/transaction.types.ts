import z from "zod";
import { txnValidator } from "../../validators/transaction.validators";

export type TransferInputType = z.infer<
  typeof txnValidator.transferInputSchema
>;
