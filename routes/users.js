const router = require("express").Router();

const {
  getUsers,
  findUser,
  createUser,
  updateUser,
  updateUserAvatar,
} = require("../controllers/users");

router.get("/", getUsers);

router.get("/:userId", findUser);

router.post("/", createUser);

router.patch("/me", updateUser);

router.patch("/me/avatar", updateUserAvatar);

module.exports = router;
