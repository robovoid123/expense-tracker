const router = require("express").Router();

const { signupValidator } = require("../middleware/validators/auth.validator");
const { checkAuth, checkNotAuth } = require("../middleware/auth.middleware");
const authController = require("../controllers/auth.controller");

router.get("/login", checkNotAuth(), authController.login);
router.post("/login", checkNotAuth(), authController.loginUser);
router.get("/sign-up", checkNotAuth(), authController.signup);
router.post(
  "/sign-up",
  checkNotAuth(),
  signupValidator(),
  authController.signupUser
);
router.get("/logout", checkAuth(), authController.logoutUser);

module.exports = { authRouter: router };
