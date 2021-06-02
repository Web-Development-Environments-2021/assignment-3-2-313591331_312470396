var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const team_utils = require("./utils/team_utils")
// const player_utils = require("./utils/player_utils");
// const coach_utils = require("./utils/coach_utils");

router.get("/:teamID", async (req, res, next) => {
  try {
    const team = await team_utils.getTeamUtils(req.params.teamID)
    //we should keep implementing team page.....
    res.send(team);
  } catch (error) {
    next(error);
  }
});

router.get("/search/:teamName", async (req, res, next) => {
  try {
    const team_details = await team_utils.getTeamByName(req.params.teamName);
    res.send(team_details);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
