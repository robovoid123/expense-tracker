const router = require("express").Router();

const expenseController = require("../controllers/expense.controller");

router.get("/", expenseController.get);
router.post("/", expenseController.add);

module.exports = { expenseRouter: router };
