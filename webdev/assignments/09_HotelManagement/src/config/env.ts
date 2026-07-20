import { z } from "zod";

export const ENV = z
  .object({
    JWT_SECRET: z.string().min(1),
    MONGO_URI: z.string().url(),
    SALT: z.coerce.number().default(10),
    PORT: z.coerce.number().default(9000),
    EMAIL_HOST: z.string(),
    EMAIL_PORT: z.coerce.number().default(587),
    EMAIL_USER: z.string(),
    EMAIL_PASS: z.string(),
    EMAIL_FROM_NAME: z.string(),
    REDIS_HOST: z.string().default("localhost"),
    REDIS_PORT: z.coerce.number().default(6379),
  })
  .parse(process.env);
