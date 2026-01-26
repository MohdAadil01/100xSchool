export class ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;

  constructor(success: boolean, data: T | null, error: string | null) {
    this.success = success;
    ((this.data = data), (this.error = error));
  }

  static success<T>(data: T) {
    return new ApiResponse(true, data, null);
  }
  static error(error: string | null) {
    return new ApiResponse(false, null, error);
  }
}
