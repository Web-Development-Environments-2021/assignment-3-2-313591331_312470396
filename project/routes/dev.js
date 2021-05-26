var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
router.get("/usersTable", async (req, res, next) => {
  try {
    const result = await DButils.execQuery("SELECT * FROM dbo.Users ");
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});
router.get("/refereesTable", async (req, res, next) => {
  try {
    const result = await DButils.execQuery("SELECT * FROM dbo.Referees ");
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/gamesTable", async (req, res, next) => {
  try {
    const result = await DButils.execQuery("SELECT * FROM dbo.Games ");
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/favoritePlayersTable", async (req, res, next) => {
  try {
    const result = await DButils.execQuery(
      "SELECT * FROM dbo.FavoritePlayers "
    );
    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/favoriteGamesTable", async (req, res, next) => {
  try {
    const result = await DButils.execQuery(
      "SELECT * FROM dbo.FavoriteGames "
    );
    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
