const DButils = require("./DButils");

//TODO:: get what DB return  
async function getGames(game_id) {
  console.log(game_id)
  const gamesData = await DButils.execQuery(
    `SELECT game from games WHERE game_id IN '${game_id}'`
  );
  return gamesData
}


exports.getGames = getGames
