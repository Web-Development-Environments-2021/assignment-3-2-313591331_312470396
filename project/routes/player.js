var express = require("express");
var router = express.Router();
const player_utils = require("./utils/player_utils");

router.get("/", async (req, res, next) => {
  try {
    const player_details = await player_utils.getPlayerUtils(req.query.id);
    res.send({ ...player_details.preview, ...player_details.additional });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
