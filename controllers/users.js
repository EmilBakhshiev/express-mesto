const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length >= 1) {
        res.send(users);
      } else {
        res.status(404).send({ message: 'Пользователи не найдены' });
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка сервера' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Ошибка серверва' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Ошибка серверва' });
      }
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((userProfile) => {
      if (userProfile) {
        res.send(userProfile);
      } else {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((userAvatar) => {
      if (userAvatar) {
        res.send(userAvatar);
      } else {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка сервера' });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
