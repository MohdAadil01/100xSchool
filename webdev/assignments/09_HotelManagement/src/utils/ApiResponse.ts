export class ApiResponse<T> {
  statusCode: number;
  success: boolean;
  data?: T;
  error?: string;
  message: string;

  private constructor(
    statusCode: number,
    success: boolean,
    message: string,
    data?: T,
    error?: string,
  ) {
    this.statusCode = statusCode;
    this.success = success;
    this.data = data;
    this.error = error;
    this.message = message;
  }

  static ok<Data>(statusCode: number, data: Data, message: string = "Success") {
    return new ApiResponse<Data>(statusCode, true, message, data);
  }

  static fail(statusCode: number, error?: string, message: string = "Failure") {
    return new ApiResponse<undefined>(
      statusCode,
      false,
      message,
      undefined,
      error,
    );
  }
}
