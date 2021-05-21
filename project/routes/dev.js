var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
router.get("/usersTable", async (req, res, next) => {
  try {
    const result = await DButils.execQuery("SELECT * FROM dbo.Users ");
    console.log(result[0]);
    res.status(200).send(result[0]);
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

module.exports = router;
