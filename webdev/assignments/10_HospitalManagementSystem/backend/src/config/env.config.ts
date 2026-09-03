export const ENV = {
  SALT: Number(process.env.SALT),
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  REDIS: process.env.REDIS || "",
  DB_URI: process.env.DB_URI || "",
};
