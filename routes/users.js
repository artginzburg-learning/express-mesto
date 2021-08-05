const router = require('express').Router();

const {
  getUsers,
  findUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', findUser);

router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
