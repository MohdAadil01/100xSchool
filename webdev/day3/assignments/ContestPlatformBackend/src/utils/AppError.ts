export class AppError extends Error {
  public statusCode: number;
  public errorCode: string;
  public isOperational: boolean = true;

  constructor(errorCode: string, statusCode: number) {
    super(errorCode);

    this.statusCode = statusCode;
    this.errorCode = errorCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
