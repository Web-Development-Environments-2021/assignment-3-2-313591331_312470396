const DButils = require("./DButils");

//TODO:: maybe convert the ids to string. 
async function getGames(game_id) {
  const gamesData = await DButils.execQuery(
    `SELECT game from games WHERE game_id IN '${game_id}'`
  );
  return gamesData
}


exports.getGames = getGames
