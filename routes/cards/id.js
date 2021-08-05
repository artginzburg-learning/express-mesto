const router = require('express').Router();

const {
  deleteCard,
  likeCard,
  unLikeCard,
} = require('../../controllers/cards');

router.delete('/', deleteCard);

router.put('/likes', likeCard);
router.delete('/likes', unLikeCard);

module.exports = router;
