import { NextFunction, Request, Response } from "express";
import { redis } from "../utils/redis";
import { AppError } from "../utils/AppError";

export const rateLimit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ip = req.ip;
    const rediskey = `ratelimit:login:${ip}`;
    const MAX_ATTEMPTS = 5;
    const WINDOW = 900;

    const count = await redis.incr(rediskey);
    if (count == 1) await redis.expire(rediskey, WINDOW);

    if (count > MAX_ATTEMPTS) {
      const ttl = await redis.ttl(rediskey);
      const minutesRemaining = Math.ceil(ttl / 60);

      throw new AppError(
        429,
        `Too many login attempts. Try again in ${minutesRemaining} minutes`,
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};
