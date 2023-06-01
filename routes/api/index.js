const { Router } = require("express");
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

const router = Router();

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
