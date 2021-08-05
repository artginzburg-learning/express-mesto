const router = require('express').Router();

const {
  getCurrentUser,
  updateUser,
  updateUserAvatar,
} = require('../../controllers/users');

router.get('/', getCurrentUser);
router.patch('/', updateUser);

router.patch('/avatar', updateUserAvatar);

module.exports = router;
