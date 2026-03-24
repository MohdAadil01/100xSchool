export class AppError extends Error {
  status: number;
  error: string;
  constructor(status: number, error: string) {
    super(error);

    this.error = error;
    this.status = status;

    Error.captureStackTrace(this, this.constructor);
  }
}
