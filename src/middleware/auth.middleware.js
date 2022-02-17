const { validateTokenAsync } = require("../utils/jwt.utils");

const checkAuth = (userRole) => {
  // return another middleware
  return async (req, res, next) => {
    if (!req.cookies || !req.cookies["auth-token"]) {
      return res.redirect("/auth/login");
    }
    const decoded = await validateTokenAsync(req.cookies["auth-token"]);
    if (decoded.error) {
      req.flash("danger", "authorization error");
      const backUrl = req.header("Referer") || "/";
      res.redirect(backUrl);
    }
    if (userRole && decoded.data.role !== userRole) {
      req.flash("danger", "not authorized");
      const backUrl = req.header("Referer") || "/";
      res.redirect(backUrl);
    }
    req.user = decoded;
    res.locals.user = decoded;
    return next();
  };
};

module.exports = { checkAuth };
