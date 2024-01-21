class ErrorServer extends Error {
  constructor(message) {
    super(message);
    this.name = 'ErrorServer';
    this.statusCode = 500;
  }
}

module.exports = ErrorServer;
