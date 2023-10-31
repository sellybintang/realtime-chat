const router = require("express").Router();
const viewRoutes = require("./viewRoutes");
const usersRoutes = require("./usersRoutes");

router.use("/", viewRoutes);

router.use("/", usersRoutes);

module.exports = router;
