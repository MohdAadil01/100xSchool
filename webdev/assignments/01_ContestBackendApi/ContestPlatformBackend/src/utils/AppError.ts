export class AppError extends Error {
  public statusCode: number;
  public error: string;
  public isOperational: boolean = true;

  constructor(error: string, statusCode: number) {
    super(error);

    this.statusCode = statusCode;
    this.error = error;

    Error.captureStackTrace(this, this.constructor);
  }
}
