const router = require("express").Router();

const { expenseRouter } = require("./expense.route");
const { incomeRouter } = require("./income.route");
const { userRouter } = require("./user.route");
const { authRouter } = require("./auth.route");

const homeController = require("../controllers/home.controller");

const { checkAuth } = require("../middleware/auth.middleware");

router.get("/", checkAuth(), homeController.get);
router.use("/income", checkAuth(), incomeRouter);
router.use("/expense", checkAuth(), expenseRouter);
router.use("/user", checkAuth(), userRouter);
router.use("/auth", authRouter);

module.exports = router;
