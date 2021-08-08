const router = require('express').Router();

const {
  getCards,
  createCard,
} = require('../../controllers/cards');
const { validateCard, validateObjectId } = require('../../middlewares/validation');

const idRouter = require('./id');

router.get('/', getCards);
router.post('/', validateCard, createCard);

router.use('/:id', validateObjectId, idRouter);

module.exports = router;
