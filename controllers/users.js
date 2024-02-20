const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorServer = require('../errors/ErrorServer');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorConflict = require('../errors/ErrorConflict');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

const jwtSecret = process.env.JWT_SECRET || 'default_secret_key';

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      const resUser = {
        email: user.email,
        name: user.name,
      };
      res.status(201).json(resUser);
    })
    .catch((error) => {
      if (error.code === 11000) {
        return next(new ErrorConflict('Пользователь с такой почтой уже существует'));
      }
      if (error.name === 'ValidationError') {
        return next(new ErrorBadRequest('Переданы некорректные данные'));
      }
      return next(new ErrorServer('Ошибка сервера'));
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new ErrorNotFound('Запрашиваемый пользователь не найден'));
      }
      const resUser = {
        email: user.email,
        name: user.name,
      };
      return res.json(resUser);
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .orFail(new ErrorNotFound('Запрашиваемый пользователь не найден'))
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new ErrorBadRequest('Переданы некорректные данные'));
      }
      if (error.name === 'ValidationError') {
        return next(new ErrorBadRequest('Переданы некорректные данные'));
      }
      return next(new ErrorServer('Ошибка сервера'));
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let foundUser;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new ErrorUnauthorized('Неверные почта или пароль'));
      }
      foundUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return next(new ErrorUnauthorized('Неверные почта или пароль'));
      }
      const token = jwt.sign({ _id: foundUser._id }, jwtSecret, { expiresIn: '7d' });
      return res.json({ message: 'Авторизация прошла успешно', token });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  try {
    res.json({ message: 'Вы успешно вышли из аккаунта' });
  } catch (err) {
    next(err);
  }
};
