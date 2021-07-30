const router = require("express").Router();

const { createUser, findUser, getUsers } = require("../controllers/users");

router.post("/", createUser);

router.get("/:userId", findUser);

router.get("/", getUsers);

module.exports = router;
