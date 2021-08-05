const router = require('express').Router();

const {
  getUsers,
  findUser,
} = require('../../controllers/users');

const meRouter = require('./me');

router.get('/', getUsers);

router.get('/:id', findUser);

router.use('/me', meRouter);

module.exports = router;
