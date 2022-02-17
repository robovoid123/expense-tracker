const { User } = require("../models");
const _ = require("lodash");
const { validationResult } = require("express-validator");
const { generateTokenAsync } = require("../utils/jwt.utils");

const login = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong", error });
  }
};

const signup = async (req, res) => {
  try {
    res.render("sign-up");
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const body = _.pick(req.body, ["email", "password"]);

    const userInDB = await User.findOne({ where: { email: body.email } });

    if (!userInDB || !(await userInDB.validPassword(body.password))) {
      // user not found or password not match
      const { password, ...form } = body;
      req.flash("danger", "invalid credentials");
      return res.render("login", { form });
    }

    const payload = {
      sub: userInDB.id,
      email: userInDB.email,
      role: userInDB.role,
    };

    const token = await generateTokenAsync(payload);

    res.cookie("auth-token", token, {
      httpOnly: true,
      maxAge: 1800000,
    });

    req.flash("success", "user successfully logged in");
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong", error });
  }
};

const signupUser = async (req, res) => {
  try {
    const body = _.pick(req.body, [
      "email",
      "name",
      "password",
      "password2",
      "address",
    ]);

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { password2, password, ...form } = body;
      errors = errors.array().reduce((acc, error) => {
        const errorMsgs = acc[error.param] || [];
        errorMsgs.push(error.msg);
        acc[error.param] = errorMsgs;
        return acc;
      }, {});
      return res.render("sign-up", { form, errors });
    }

    const { password2, ...userData } = body;

    userData.role = "user";
    // create user
    await User.create(userData);
    // redirect to login
    req.flash("success", "user created successfully");
    res.redirect("/auth/login");
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong", error });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("auth-token", "", { expires: new Date(0) });
    res.redirect("/auth/login");
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong", error });
  }
};

module.exports = { login, signup, loginUser, signupUser, logoutUser };
