class ApiRespnse {
  constructor(statusCode, data, message = "success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.sucess = statusCode < 400;
  }
}
export { ApiRespnse };
