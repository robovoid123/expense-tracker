const { Record, Category } = require("../models");

const get = async (req, res) => {
  try {
    const categories = await Category.findAll({ raw: true });
    res.render("income", { categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong", error });
  }
};

const add = async (req, res) => {
  try {
    const { subject, amount, category } = req.body;
    const record = await Record.create({
      userId: req.user.sub,
      subject,
      amount: parseFloat(amount),
      type: "income",
      categoryId: category,
    });
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
