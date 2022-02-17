const { validateTokenAsync } = require("../utils/jwt.utils");

const checkAuth = (userRole) => {
  // return another middleware
  return async (req, res, next) => {
    if (!req.cookies || !req.cookies["auth-token"]) {
      return res.redirect("/auth/login");
    }
    const decoded = await validateTokenAsync(req.cookies["auth-token"]);
    if (decoded.error) {
      return res.json(decoded);
    }
    if (userRole && decoded.data.role !== userRole) {
      return res.json({ error: "not authorized" });
    }
    req.user = decoded;
    return next();
  };
};

module.exports = { checkAuth };
