//Checking that the account is logged.
var express = require("express");
var router = express.Router();
const DButils = require("../routes/utils/DButils");
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users")
      .then((users) => {
        if (users.find((x) => x.user_id === req.session.user_id)) {
          req.user_id = req.session.user_id;
          next();
        }
      })
      .catch((err) => {
        next(err);
      });
  } else {
    next(new Error("Must login to do this action."));
  }
});
module.exports = router;
