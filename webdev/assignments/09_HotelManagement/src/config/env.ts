import { z } from "zod";

export const ENV = z
  .object({
    JWT_SECRET: z.string().min(1),
    MONGO_URI: z.string().url(),
    SALT: z.coerce.number().default(10),
    PORT: z.coerce.number().default(9000),
  })
  .parse(process.env);
