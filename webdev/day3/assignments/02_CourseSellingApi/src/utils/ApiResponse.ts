export class ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  error: string | null;
  private constructor(success: boolean, data: T | null, error: string | null) {
    ((this.success = success), (this.data = data));
    this.error = error;
  }
  static success<T>(data: T) {
    return new ApiResponse<T>(true, data, null);
  }
  static error(error: string) {
    return new ApiResponse<null>(false, null, error);
  }
}
