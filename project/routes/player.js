var express = require("express");
var router = express.Router();
const player_utils = require("./utils/player_utils");

router.get("/:playerID", async (req, res, next) => {
  try {
    const player_details = await player_utils.getPlayerUtils(req.params.playerID);
    res.send(player_details);
  } catch (error) {
    next(error);
  }
});

router.get("/search/:playerName", async (req, res, next) => {
  try {
    const player_details = await player_utils.getPlayerByName(req.params.playerName);
    res.send(player_details);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
