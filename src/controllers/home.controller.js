const { Record } = require("../models");
const {
  calculateTotal,
  calculateTotalIncome,
  calculateTotalExpense,
} = require("../utils/calculateTotal.utils");

const get = async (req, res) => {
  try {
    const records = await Record.findAll({ raw: true });
    const total = {
      total: calculateTotal(records),
      income: calculateTotalIncome(records),
      expense: calculateTotalExpense(records),
    };

    res.render("home", { records, total });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong", error });
  }
};

module.exports = { get };
