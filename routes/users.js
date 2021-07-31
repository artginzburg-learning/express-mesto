const router = require("express").Router();

const {
  getUsers,
  findUser,
  createUser,
  updateUser,
  updateUserAvatar,
} = require("../controllers/users");

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", findUser);

router.patch("/me", updateUser);
router.patch("/me/avatar", updateUserAvatar);

module.exports = router;
