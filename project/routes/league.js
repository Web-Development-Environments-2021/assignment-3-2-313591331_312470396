var express = require("express");
var router = express.Router();
const league_utils = require("./utils/league_utils");
const users_utils = require("./utils/users_utils");
const game_utils = require("./utils/game_utils");
const user_auth = require("../middleware/mid_user");

router.use(user_auth); // If user is not logged in , Middleware will next an Error, the guest Will take care of. if Logged, will get to End Point
router.use(function (err, req, res, next) {
  guestMainPage(req, res, next);
});

const guestMainPage = async (req, res, next) => {
  try {
    const league_details = await league_utils.getLeagueDetails();
    res.status(200);
    res.send(league_details);
  } catch (error) {
    next(error);
  }
};

router.get("/", async (req, res, next) => {
  try {
    const league_details = await league_utils.getLeagueDetails();
    const game_ids = await users_utils.getFavoriteGames(req.session.user_id);
    let games_ids_array = [];
    game_ids.map((element) => games_ids_array.push(element.game_id)); //extracting the game ids into array
    let upcomingGames = await game_utils.getGameUtils(games_ids_array);
    upcomingGames = game_utils.filterUpcomingGames(upcomingGames);
    if (upcomingGames.length > 3) {
      upcomingGames = upcomingGames.slice(0, 3);
    }
    res.status(201);
    res.send({ league_details, upcomingGames });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
