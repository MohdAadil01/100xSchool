export class ApiResponse<T> {
  statusCode: number;
  message: string;
  data?: T | null;
  error?: string | null;

  constructor(
    statusCode: number,
    message: string,
    data: T | null,
    error: string | null,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    if (data) this.data = data;
    if (error) this.error = error;
  }

  static success<T>(statusCode: number, data: T, message: string) {
    return new ApiResponse(statusCode, message, data, null);
  }

  static fail(statusCode: number, error: string, message: string) {
    return new ApiResponse(statusCode, message, null, error);
  }
}
