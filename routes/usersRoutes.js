const {
  register,
  login,
  getAllProfile,
  deleteProfile,
} = require("../controller/usersController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/AllProfile", getAllProfile);
router.delete("/deleteProfile/:id", deleteProfile);

module.exports = router;
