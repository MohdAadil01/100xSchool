export class ApiResponse<T> {
  statusCode: number;
  success: boolean;
  data?: T;
  error?: string;

  constructor(statusCode: number, success: boolean, data?: T, error?: string) {
    this.statusCode = statusCode;
    this.success = success;
    this.data = data;
    this.error = error;
  }

  static ok<Data>(statusCode: number, data: Data) {
    return new ApiResponse<Data>(statusCode, true, data);
  }

  static fail(statusCode: number, error?: string) {
    return new ApiResponse<undefined>(statusCode, false, undefined, error);
  }
}
