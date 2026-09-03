export const ENV = {
  SALT: Number(process.env.SALT),
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  REDIS: process.env.REDIS || "",
  DB_URI: process.env.DB_URI || "",
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: Number(process.env.EMAIL_PORT) || 587,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
};
