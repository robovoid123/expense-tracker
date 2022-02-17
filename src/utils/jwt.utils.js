const jwt = require("jsonwebtoken");

SECRET = "84a1b3b8eb786a83f30bcfa4e7e6bf6c8981303c";
const generateToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
};

const validateToken = async (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (e) {
    return {
      error: "Invalid token",
    };
  }
};

const generateTokenAsync = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET, { expiresIn: "1h" }, (err, encoded) => {
      if (err) reject(err);
      else resolve(encoded);
    });
  });
};

const validateTokenAsync = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, (err, data) => {
      if (err) reject(err);
      else {
        resolve(data);
      }
    });
  });
};

module.exports = {
  generateToken,
  validateToken,
  generateTokenAsync,
  validateTokenAsync,
};
