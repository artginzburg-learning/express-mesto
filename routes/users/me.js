const router = require('express').Router();

const {
  getCurrentUser,
  updateUser,
  updateUserAvatar,
} = require('../../controllers/users');
const { validateUserInfo, validateUserAvatar } = require('../../middlewares/validation');

router.get('/', getCurrentUser);
router.patch('/', validateUserInfo, updateUser);

router.patch('/avatar', validateUserAvatar, updateUserAvatar);

module.exports = router;
