var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const player_utils = require("./utils/player_utils");
const coach_utils = require("./utils/coach_utils");
let team_details = {};
router.get("/", async (req, res, next) => {
  try {
    team_details.players = await player_utils.getPlayersByTeam(req.query.id);
    team_details.coach = await coach_utils.getCoachByTeam(req.query.id);
    //we should keep implementing team page.....
    res.send(team_details);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
