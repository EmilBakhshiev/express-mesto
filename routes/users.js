const express = require('express');
const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getMyUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/users/me', getMyUser);
router.get('/:userId', getUserById);
router.patch('/me', express.json(), updateProfile);
router.patch('/me/avatar', express.json(), updateAvatar);

module.exports = router;
