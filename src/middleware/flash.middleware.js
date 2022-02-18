module.exports = {
  flashMessage: (req, res, next) => {
    const success = req.flash("success");
    const danger = req.flash("danger");
    const warning = req.flash("warning");

    let flash = {};
    if (success.length > 0) {
      flash.message = success;
      flash.type = "success";
    } else if (danger.length > 0) {
      flash.message = danger;
      flash.type = "danger";
    } else if (warning.length > 0) {
      flash.message = warning;
      flash.type = "warning";
    }

    if (Object.keys(flash).length === 0) flash = null;
    res.locals.flash = flash;
    next();
  },
};
