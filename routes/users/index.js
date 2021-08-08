const router = require('express').Router();

const {
  getUsers,
  findUser,
} = require('../../controllers/users');
const { validateObjectId } = require('../../middlewares/validation');

const meRouter = require('./me');

router.get('/', getUsers);

router.get('/:id', validateObjectId, findUser);

router.use('/me', meRouter);

module.exports = router;
