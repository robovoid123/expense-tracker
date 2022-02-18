const { Record, Category } = require("../models");

const get = async (req, res) => {
  try {
    const categories = await Category.findAll({ raw: true });
    res.render("expense", { categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong", error });
  }
};

// TODO: validate input
const add = async (req, res) => {
  try {
    const { subject, amount, category } = req.body;
    const record = await Record.create({
      userId: req.user.id,
      subject,
      amount: parseFloat(amount),
      type: "expense",
      categoryId: category,
    });
    req.flash("success", "expense added successfully");
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong", error });
  }
};

// const update = async (req, res) => {
//   try {
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "something went wrong", error });
//   }
// };

// const remove = async (req, res) => {
//   try {
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "something went wrong", error });
//   }
// };

module.exports = { get, add };
