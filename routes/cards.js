const express = require('express');
const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCards,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/cards', express.json(), createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', likeCards);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
