const axios = require("axios");
const DButils = require("./DButils");
const game_utils = require("./game_utils");

const getStagePage = async (stage_id) => {
  const games = await game_utils.getGameByStage(stage_id);
  const currentDate = new Date();
  return {
    stageID: stage_id,
    upcoming_games: game_utils.filterUpcomingGames(games),
    previous_games: await game_utils.filterPreviousGames(games),
  };
};

exports.getStagePage = getStagePage;
