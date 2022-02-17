const { User } = require("../models");

const get = async (req, res) => {
  try {
    res.render("user-profile");
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong", error });
  }
};

module.exports = { get };
