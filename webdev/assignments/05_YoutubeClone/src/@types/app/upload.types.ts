import z from "zod";
import { uploadValidator } from "../../validators/upload.validator";

export type UploadInputType = z.infer<typeof uploadValidator.uploadInputSchema>;
