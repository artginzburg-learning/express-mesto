const router = require('express').Router();

const {
  getCards,
  createCard,
} = require('../../controllers/cards');
const { validateCard, validateObjectId } = require('../../middlewares/validation');

const idRouter = require('./id');

router.use('/:id', validateObjectId, idRouter);

router.get('/', getCards);
router.post('/', validateCard, createCard);

module.exports = router;
