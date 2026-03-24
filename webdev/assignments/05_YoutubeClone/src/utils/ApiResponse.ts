export class ApiResponse<T> {
  status: number;
  success: boolean;
  data: T | null;
  error: string | null;

  constructor(
    status: number,
    success: boolean,
    data: T | null,
    error: string | null,
  ) {
    this.status = status;
    this.success = success;
    this.data = data;
    this.error = error;
  }

  static success<T>(status: number, data: T) {
    return new ApiResponse<T>(status, true, data, null);
  }

  static error(status: number, error: string) {
    return new ApiResponse<null>(status, false, null, error);
  }
}
