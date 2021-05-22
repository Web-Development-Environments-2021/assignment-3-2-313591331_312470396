var express = require("express");
var router = express.Router();
const coach_utils = require("./utils/coach_utils");

router.get("/", async (req, res, next) => {
  try {
    const coach_details = await coach_utils.getCoachUtils(req.query.id);
    res.send({ ...coach_details.preview, ...coach_details.additional });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
