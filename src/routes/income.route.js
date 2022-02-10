const router = require("express").Router();

const incomeController = require("../controllers/income.controller");

router.get("/", incomeController.get);
router.post("/", incomeController.add);

module.exports = { incomeRouter: router };
