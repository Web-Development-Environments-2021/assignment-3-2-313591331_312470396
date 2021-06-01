var express = require("express");
var router = express.Router();
const farUtils = require("./utils/far_utils");
const gameUtils = require("./utils/game_utils");
const far_auth = require("../middleware/mid_FAR");
router.use(far_auth);
router.get("/", async (req, res, next) => {
  try{
    res.send( await gameUtils.gelAllGames())
  }catch(err){
    res.send(err)
  }
})
router.post("/addReferee", async (req, res, next) => {
  try {
    const qualification = req.body.qualification;
    const user_id = req.body.user_id;
    if (qualification == null) {
      throw { status: 409, message: "You must provide qualification" };
    }
    if (user_id == null) {
      throw { status: 409, message: "You must provide user details" };
    }
    await farUtils.addRefereeUtils(user_id, qualification);
    res.status(201).send("Referee added successfully");
  } catch (error) {
    next(error);
  }
});

router.put("/addGameResult", async (req,res,next) => {
  try{
    // const {gameID,homeTeamResult,awayTeamResult} = req.body
    res.send(await gameUtils.addGameResult(req.body))
    // res.send({gameID,homeTeamResult,awayTeamResult})
  }catch(err){res.send(err)}
})

router.post("/addReport", async (req,res,next) => {
  try{
    await gameUtils.addReport(req.body)
      res.status(200).send("Success")
  }catch(err){res.send(err)}
})

router.post("/addGame", async (req, res, next) => {
  try {
    const leagueID = req.body.leagueID;
    const seasonID = req.body.seasonID;
    const stageID = req.body.stageID;
    const refereeID = req.body.refereeID;
    const stadiumID = req.body.stadiumID;
    const homeTeamID = req.body.homeTeamID;
    const awayTeamID = req.body.awayTeamID;
    const gameDate = req.body.gameDate;
    // might be undefined. Handled in the game-util.
    await gameUtils.addGame(
      leagueID,
      seasonID,
      stageID,
      refereeID,
      stadiumID,
      homeTeamID,
      awayTeamID,
      gameDate
    );
    res.status(201).send("Game added successfully");
  } catch (error) {
    next(error);
  }
});
module.exports = router;
