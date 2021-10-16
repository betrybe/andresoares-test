class HttpException {
  constructor(typeError) {
    this.message = typeError.message;
    this.status = typeError.status;
  }
}

module.exports = HttpException;