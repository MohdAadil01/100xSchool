export class ApiResponse<T> {
  status: number;
  success: boolean;
  data?: T;
  error?: string;

  constructor(status: number, success: boolean, data?: T, error?: string) {
    this.status = status;
    this.success = success;
    if (data != undefined) this.data = data;
    if (error != undefined) this.error = error;
  }

  static success<T>(status: number, data: T) {
    return new ApiResponse<T>(status, true, data);
  }

  static error(status: number, error: string) {
    return new ApiResponse<null>(status, false, undefined, error);
  }
}
