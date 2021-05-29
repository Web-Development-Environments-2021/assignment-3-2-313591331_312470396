const axios = require("axios");
const DButils = require("./DButils");
const game_utils = require("./game_utils");


const getStagePage = async (stage_id) => {
  const games = await game_utils.getGameByStage(stage_id)
  return {
    stageID: stage_id,
    upcoming_games: games.filter((game) => !game.gameReportID),
    previous_games: games.filter((game) => game.gameReportID),
  }
}

exports.getStagePage = getStagePage;
