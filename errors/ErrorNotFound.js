class ErrorNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'ErrorNotFound';
    this.statusCode = 404;
  }
}

module.exports = ErrorNotFound;
