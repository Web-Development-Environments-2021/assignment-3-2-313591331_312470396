var express = require("express");
var router = express.Router();
const game_utils = require("./utils/game_utils");

router.get("/", async (req, res, next) => {
  try {
    const team = await game_utils.getGameUtils([req.query.id]);
    res.send(team);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
