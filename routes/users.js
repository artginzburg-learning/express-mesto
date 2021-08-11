const router = require('express').Router();

const {
  getUsers,
  findUser,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');
const { validateObjectId, validateUserInfo, validateUserAvatar } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/:id', validateObjectId, findUser);

router.get('/', getCurrentUser);
router.patch('/', validateUserInfo, updateUser);

router.patch('/avatar', validateUserAvatar, updateUserAvatar);

module.exports = router;
