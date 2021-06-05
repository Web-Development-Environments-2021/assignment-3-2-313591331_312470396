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

module.exports = router;
