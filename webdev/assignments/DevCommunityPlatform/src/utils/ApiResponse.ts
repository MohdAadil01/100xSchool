export class ApiResponse<T> {
  status: number;
  data: T | undefined;
  error: string | undefined;
  success: boolean;
  message: string;
  private constructor(
    status: number,
    data: T | undefined,
    error: string | undefined,
    success: boolean,
    message: string,
  ) {
    this.status = status;
    this.data = data;
    this.error = error;
    this.success = success;
    this.message = message;
  }

  static ok<T>(
    status: number,
    data: T | undefined,
    message: string = "Success",
  ) {
    return new ApiResponse(status, data, undefined, true, message);
  }
  static fail(
    status: number,
    error: string | undefined,
    message: string = "Something went wrong",
  ) {
    return new ApiResponse(status, undefined, error, false, message);
  }
}
