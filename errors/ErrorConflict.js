class ErrorConflict extends Error {
  constructor(message) {
    super(message);
    this.name = 'ErrorConflict';
    this.statusCode = 409;
  }
}

module.exports = ErrorConflict;
