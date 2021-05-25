var express = require("express");
var router = express.Router();
const user_auth = require("./mid_user");
router.use(async function (req, res, next) {
  if (req.session.type === "FAR") {
    next();
  } else {
    res.status(401).send("You Must be a Football Association Representor");
  }
});
module.exports = router;
