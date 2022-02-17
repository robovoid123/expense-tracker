const bcrypt = require("bcryptjs");

const hashPasswordSync = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const hashPasswordAsync = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePasswordAsync = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  hashPasswordSync,
  hashPasswordAsync,
  comparePasswordAsync,
};
