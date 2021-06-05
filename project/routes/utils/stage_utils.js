const game_utils = require("./game_utils");
const getStagePage = async (stage_id) => {
  const games = await game_utils.getGameByStage(stage_id);
  return {
    stageID: stage_id,
    upcoming_games: game_utils.filterUpcomingGames(games),
    previous_games: await game_utils.filterPreviousGames(games),
  };
};

exports.getStagePage = getStagePage;
