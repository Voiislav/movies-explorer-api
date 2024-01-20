class ErrorUnauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = 'ErrorUnauthorized';
    this.statusCode = 401;
  }
}

module.exports = ErrorUnauthorized;
