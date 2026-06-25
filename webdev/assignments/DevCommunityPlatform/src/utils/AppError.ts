class AppError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "AppError";

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
