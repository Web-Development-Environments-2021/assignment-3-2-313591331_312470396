const axios = require("axios");
const DButils = require("./DButils");
const game_utils = require("./game_utils");

const getStagePage = async (stage_id) => {
  const games = await game_utils.getGameByStage(stage_id);
  const currentDate = new Date();
  return {
    stageID: stage_id,
    upcoming_games: games.filter((game) => new Date(game.gameDate) > currentDate),
    previous_games: await Promise.all(
      games
        .filter((game) => new Date(game.gameDate) < currentDate)
        .map(async (game) => {
          return {
            ...game,
            gameReport: await game_utils.getGameReportsForGame(game.gameID),
          };
        })
    ),
  };
};

exports.getStagePage = getStagePage;
