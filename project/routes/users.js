var express = require("express");
var router = express.Router();
const users_utils = require("./utils/users_utils");
const player_utils = require("./utils/player_utils");
const game_utils = require("./utils/game_utils");
const team_utils = require("./utils/team_utils");
const user_auth = require("../middleware/mid_user");
router.use(user_auth); // Checks all incoming requests are from Logged users(checked by cookie).
router.post("/Favorite", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const favorite_type = req.body.favorite_type;
    const favorite_id = req.body.favorite_id;
    switch (favorite_type) {
      case "TEAM":
        team_utils.markTeamAsFavorite(user_id, favorite_id);
        break;
      case "PLAYER":
        player_utils.markPlayerAsFavorite(user_id, favorite_id);
        break;
      case "GAME":
        game_utils.markGameAsFavorite(user_id, favorite_id);
        break;
    }
    res.status(201).send(favorite_type + " successfully saved as favorite");
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns the favorites players that were saved by the logged-in user
 */
router.get("/FavoritePlayers", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    let favorite_players = {};
    const player_ids = await users_utils.getFavoritePlayers(user_id);
    let player_ids_array = [];
    player_ids.map((element) => player_ids_array.push(element.player_id)); //extracting the players ids into array
    const results = await player_utils.getPlayersInfo(player_ids_array);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});



module.exports = router;
