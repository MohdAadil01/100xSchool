export class AppError extends Error {
  error: string;
  statusCode: number;
  constructor(error: string, statusCode: number) {
    super(error);
    this.error = error;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
