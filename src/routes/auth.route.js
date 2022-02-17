const router = require("express").Router();

const { signupValidator } = require("../middleware/validators/auth.validator");
const authController = require("../controllers/auth.controller");

router.get("/login", authController.login);
router.post("/login", authController.loginUser);
router.get("/sign-up", authController.signup);
router.post("/sign-up", signupValidator(), authController.signupUser);
router.get("/logout", authController.logoutUser);

module.exports = { authRouter: router };
