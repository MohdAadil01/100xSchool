import { NextFunction, Request, Response } from "express";

type AsyncHandlerFn = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

const AsyncHandler = (fn: AsyncHandlerFn) => {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default AsyncHandler;
