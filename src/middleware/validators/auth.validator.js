const { check } = require("express-validator");
const { User } = require("../../models");

const signupValidator = () => {
  return [
    check("name").exists().trim().withMessage("name is required"),
    check("email", "you must enter a valid email").exists().isEmail().trim(),
    check("email", "email already in user")
      .exists()
      .trim()
      .custom(async (value) => {
        const userInDB = await User.findOne({ where: { email: value } });
        if (userInDB) {
          return Promise.reject();
        }
      }),
    check("password", "password must be more than 5 character long")
      .exists()
      .trim()
      .isLength({ min: 5 }),
    check("password2", "password did not match")
      .exists()
      .trim()
      .custom((value, { req }) => value === req.body.password),
  ];
};

module.exports = {
  signupValidator,
};
