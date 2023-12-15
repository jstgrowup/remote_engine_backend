class ApiError extends Error {
  constructor(statusCode, message = "something went wrong", errors = []) {
    console.log("message:", message);
    super(message);
    this.statusCode = statusCode;
    this.data = message;
    this.message = message;
    this.success = false;
    this.error = errors;
  }
}
export { ApiError };
