const { Record } = require("../models");

const get = async (req, res) => {
  try {
    res.render("income");
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong", error });
  }
};

const add = async (req, res) => {
  try {
    const { subject, amount } = req.body;
    const record = await Record.create({
      subject,
      amount: parseFloat(amount),
      type: "income",
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
