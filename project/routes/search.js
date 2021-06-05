var express = require("express");
var router = express.Router();
const player_utils = require("./utils/player_utils");
const team_utils = require("./utils/team_utils");
const user_auth = require("../middleware/mid_user");
router.get("/player/:playerName", async (req, res, next) => {
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

router.get("/team/:teamName", async (req, res, next) => {
  try {
    const team_details = await team_utils.getTeamByName(req.params.teamName);
    if (req.session && req.session.user_id) {
      //User
      req.session.search = {
        type: "TEAM",
        name: req.params.teamName,
      };
    }
    res.send(team_details);
  } catch (error) {
    next(error);
  }
});

router.use(user_auth);
router.use(function (err, req, res, next) {
  console.error(err);
  res.status(401).send("User not logged in, can't search for history.");
});

router.get("/last", async (req, res, next) => {
  try {
    let player_details;
    if (req.session && req.session.search) {
      if (req.session.search.type == "PLAYER") {
        player_details = await player_utils.getPlayerByName(
          req.session.search.name,
          req.session.search.team,
          req.session.search.pos
        );
        res.send(player_details);
      } else if (req.session.search.type == "TEAM") {
        player_details = await team_utils.getTeamByName(
          req.session.search.name
        );
        res.send(player_details);
      }
    } else {
      res.send("User found logged, but no search history.").status(201);
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
