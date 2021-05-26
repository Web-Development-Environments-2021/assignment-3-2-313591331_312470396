var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const team_utils = require("./utils/team_utils")
// const player_utils = require("./utils/player_utils");
// const coach_utils = require("./utils/coach_utils");

router.get("/", async (req, res, next) => {
  try {
    const team = await team_utils.getTeamUtils(req.query.id)
    //we should keep implementing team page.....
    res.send(team);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
