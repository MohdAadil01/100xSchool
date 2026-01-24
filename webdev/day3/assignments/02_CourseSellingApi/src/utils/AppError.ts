export class AppError extends Error {
  statusCode: number;
  errorMessage: string;
  constructor(errorMessage: string, statusCode: number) {
    super(errorMessage);
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;

    Error.captureStackTrace(this, this.constructor);
  }
}
