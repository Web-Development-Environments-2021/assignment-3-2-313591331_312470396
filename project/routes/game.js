var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const game_utils = require("./utils/game_utils");
// const player_utils = require("./utils/player_utils");
// const coach_utils = require("./utils/coach_utils");

router.get("/", async (req, res, next) => {
  try {
    const team = await game_utils.getGameUtils([req.query.id]);
    res.send(team);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
