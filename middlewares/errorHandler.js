const {
  ERROR_NOT_FOUND,
  ERROR_BAD_REQUEST,
  SERVER_ERROR,
  ERROR_UNAUTHORIZED,
  ERROR_FORBIDDEN,
  ERROR_CONFLICT,
} = require('../utils/errorCodes');

module.exports.errorHandler = (err, req, res, next) => {
  let statusCode;
  let message;

  switch (err.statusCode) {
    case ERROR_NOT_FOUND:
      statusCode = ERROR_NOT_FOUND;
      message = 'Not Found';
      break;
    case ERROR_BAD_REQUEST:
      statusCode = ERROR_BAD_REQUEST;
      message = 'Bad Request';
      break;
    case SERVER_ERROR:
      statusCode = SERVER_ERROR;
      message = 'Internal Server Error';
      break;
    case ERROR_UNAUTHORIZED:
      statusCode = ERROR_UNAUTHORIZED;
      message = 'Unauthorized';
      break;
    case ERROR_FORBIDDEN:
      statusCode = ERROR_FORBIDDEN;
      message = 'Forbidden';
      break;
    case ERROR_CONFLICT:
      statusCode = ERROR_CONFLICT;
      message = 'Conflict';
      break;
    default:
      statusCode = SERVER_ERROR;
      message = 'Internal Server Error';
  }

  res.status(statusCode).json({ message });

  next(err);
};
