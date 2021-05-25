var express = require("express");
var router = express.Router();
const referee_utils = require("./utils/referee_utils");
//GET Referee by id
router.get("/", async (req, res, next) => {
  try {
    const referee_details = await referee_utils.get_refereeUtils(req.query.id);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
