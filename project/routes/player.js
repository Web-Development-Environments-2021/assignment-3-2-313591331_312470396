var express = require("express");
var router = express.Router();
const player_utils = require("./utils/player_utils");
router.get("/:playerID", async (req, res, next) => {
  try {
    const player_details = await player_utils.getPlayerUtils(
      req.params.playerID
    );
    res.send(player_details);
  } catch (error) {
    next(error);
  }
});
router.get("/search/:playerName", async (req, res, next) => {
  try {
    let player_details;
    let filter_team = req.query.team;
    let filter_position = req.query.position;
    player_details = await player_utils.getPlayerByName(
      req.params.playerName,
      filter_team,
      filter_position
    );
    if (req.session && req.session.user_id) {
      //User
      req.session.search = {
        type: "PLAYER",
        name: req.params.playerName,
        team: filter_team,
        pos: filter_position,
      };
    }
    res.send(player_details);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
