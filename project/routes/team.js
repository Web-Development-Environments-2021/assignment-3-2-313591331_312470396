var express = require("express");
var router = express.Router();
const team_utils = require("./utils/team_utils");

router.get("/:teamID", async (req, res, next) => {
  try {
    const team = await team_utils.getTeamUtils(req.params.teamID);
    res.send(team);
  } catch (error) {
    next(error);
  }
});
router.get("/name/:teamID", async (req, res, next) => {
  try {
    console.log(req.params.teamID);
    const team = await team_utils.getTeamName(req.params.teamID);
    res.send(team);

  } catch (error) {
    next(error);
  }
});

module.exports = router;
