class ErrorForbidden extends Error {
  constructor(message) {
    super(message);
    this.name = 'ErrorForbidden';
    this.statusCode = 403;
  }
}

module.exports = ErrorForbidden;
