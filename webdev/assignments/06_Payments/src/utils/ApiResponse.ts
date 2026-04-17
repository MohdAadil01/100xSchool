export class ApiResponse<T> {
  data?: T | null;
  success: boolean;
  error?: string | null;
  status: number;

  constructor(status: number, success: boolean, data?: T, error?: string) {
    this.success = success;
    this.status = status;
    if (data != undefined) this.data = data;
    if (error != undefined) this.error = error;
  }

  static success<T>(status: number, data: T) {
    return new ApiResponse(status, true, data);
  }
  static error(status: number, error: string) {
    return new ApiResponse(status, false, undefined, error);
  }
}
