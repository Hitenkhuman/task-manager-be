/**
 * This file is used to auth API's routes.
 * @name authRoutes
 */
const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.post("/google", userController.googleAuth);

module.exports = router;