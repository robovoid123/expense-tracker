const { validateTokenAsync } = require("../utils/jwt.utils");

const checkAuth = (userRole) => {
  // return another middleware
  return async (req, res, next) => {
    const user = req.session.user || null;

    if (!user) {
      req.flash("danger", "not authenticated");
      return res.redirect("/auth/login");
    }
    // const decoded = await validateTokenAsync(req.cookies["auth-token"]);
    // if (decoded.error) {
    //   req.flash("danger", "authorization error");
    //   const backUrl = req.header("Referer") || "/";
    //   res.redirect(backUrl);
    // }

    if (userRole && user.role !== userRole) {
      req.flash("danger", "not authorized");
      const backUrl = req.header("Referer") || "/";
      res.redirect(backUrl);
    }

    req.user = user;
    res.locals.user = user;
    return next();
  };
};

const checkNotAuth = () => {
  return async (req, res, next) => {
    if (req.cookies["auth-token"]) {
      const decoded = await validateTokenAsync(req.cookies["auth-token"]);
      if (!decoded.error) {
        req.flash("danger", "already authenticated");
        res.redirect("/");
      }
    }
    return next();
  };
};

module.exports = { checkAuth, checkNotAuth };
