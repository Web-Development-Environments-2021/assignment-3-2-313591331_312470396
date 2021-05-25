var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const users_utils = require("./utils/users_utils");
const player_utils = require("./utils/player_utils");
const far_auth = require("../middleware/mid_FAR");
router.use(far_auth);
router.post("/addReferee", async (req, res, next) => {
  try {
    res.status(200).send("Success FAR");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
