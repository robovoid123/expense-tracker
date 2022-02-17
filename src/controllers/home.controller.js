const { Record, Category } = require("../models");
const {
  calculateTotal,
  calculateTotalIncome,
  calculateTotalExpense,
} = require("../utils/calculateTotal.utils");

const get = async (req, res) => {
  try {
    let records = await Record.findAll({
      where: {
        userId: req.user.sub,
      },
      raw: true,
      include: {
        model: Category,
        attributes: ["name"],
      },
    });

    records = records.map((record) => ({
      ...record,
      category: record["Category.name"],
    }));

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
