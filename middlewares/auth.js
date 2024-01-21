const jwt = require('jsonwebtoken');

require('dotenv').config();

const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

const jwtSecret = process.env.JWT_SECRET || 'default_secret_key';

module.exports = (req, res, next) => {
  const tokenFromCookie = req.cookies.jwt;

  if (!tokenFromCookie) {
    return next(new ErrorUnauthorized('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(tokenFromCookie, jwtSecret);
  } catch (error) {
    return next(new ErrorUnauthorized('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
