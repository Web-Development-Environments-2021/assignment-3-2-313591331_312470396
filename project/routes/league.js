var express = require("express");
var router = express.Router();
const league_utils = require("./utils/league_utils");
const users_utils = require("./utils/users_utils")
const game_utils = require("./utils/game_utils")

router.get("/:userId", async (req, res, next) => {
  try {
    const league_details = await league_utils.getLeagueDetails();
    res.send(league_details);
  } catch (error) {
    next(error);
  }
});
//Add auth middleware 
router.get("/:userId", async (req, res, next) => {
  try {
    const league_details = await league_utils.getLeagueDetails();
    const userFavoriteGames = await users_utils.getFavoriteGames(req.query.userId);
    const gamesData = await game_utils.getGames(userFavoriteGames)
    res.send({league_details,gamesData});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
