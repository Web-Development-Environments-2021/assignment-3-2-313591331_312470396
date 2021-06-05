const DButils = require("./DButils");

async function getFavoritePlayers(user_id) {
  const player_ids = await DButils.execQuery(
    `select player_id from FavoritePlayers where user_id='${user_id}'`
  );
  return player_ids;
}

async function getFavoriteGames(user_id) {
  const game_ids = await DButils.execQuery(
    `SELECT game_id FROM [dbo].[FavoriteGames] WHERE user_id = '${user_id}'`
  );
  return game_ids;
}

async function getFavoriteTeams(user_id) {
  const team_ids = await DButils.execQuery(
    `SELECT team_id FROM [dbo].[FavoriteTeams] WHERE user_id = '${user_id}'`
  );
  return team_ids;
}

exports.getFavoritePlayers = getFavoritePlayers;
exports.getFavoriteTeams = getFavoriteTeams;
exports.getFavoriteGames = getFavoriteGames;
