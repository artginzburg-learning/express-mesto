const router = require('express').Router();

const {
  getUsers,
  findUser,
} = require('../../controllers/users');
const { validateObjectId } = require('../../middlewares/validation');

const meRouter = require('./me');

router.use('/me', meRouter);

router.get('/', getUsers);
router.get('/:id', validateObjectId, findUser);

module.exports = router;
