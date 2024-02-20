const jwt = require('jsonwebtoken');
require('dotenv').config();
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const jwtSecret = process.env.JWT_SECRET || 'default_secret_key';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ErrorUnauthorized('Необходима авторизация'));
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return next(new ErrorUnauthorized('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (error) {
    return next(new ErrorUnauthorized('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
