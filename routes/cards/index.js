const router = require('express').Router();

const {
  getCards,
  createCard,
} = require('../../controllers/cards');

const idRouter = require('./id');

router.get('/', getCards);
router.post('/', createCard);

router.use('/:id', idRouter);

module.exports = router;
