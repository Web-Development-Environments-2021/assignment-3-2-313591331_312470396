const { NText } = require("mssql");
const DButils = require("./DButils");

//TODO:: get what DB return  
async function getGames(game_id) {
  console.log(game_id)
  const gamesData = await DButils.execQuery(
    `SELECT game from games WHERE game_id IN '${game_id}'`
  );
  return gamesData;
}

async function addGame(
  leagueID,
  seasonID,
  stageID,
  refereeID,
  stadiumID,
  homeTeamID,
  awayTeamID,
  gameDate
) {
  //Referee ID is optional. to ease the far to create game when the referee hasn't decided yet.
  if (refereeID === undefined) {
    await DButils.execQuery(
      `INSERT INTO dbo.Games (leagueID,seasonID,stageID,stadiumID,homeTeamID,awayTeamID,gameDate) VALUES ('${leagueID}','${seasonID}','${stageID}','${stadiumID}','${homeTeamID}','${awayTeamID}','${gameDate}')`
    );
  } else {
    await DButils.execQuery(
      `INSERT INTO dbo.Games (leagueID,seasonID,stageID,refereeID,stadiumID,homeTeamID,awayTeamID,gameDate) VALUES ('${leagueID}','${seasonID}','${stageID}','${refereeID}','${stadiumID}','${homeTeamID}','${awayTeamID}','${gameDate}')`
    );
  }
}

async function markGameAsFavorite(user_id, game_id) {
  try {
    await getPlayerUtils(game_id);
  } catch (error) {
    throw { status: 404, message: "Game " + game_id + " doesn't exist!" };
  }
  DButils.execQuery(
    `insert into FavoritePlayers values ('${user_id}',${game_id})`
  );
}

exports.getGames = getGames;
exports.addGame = addGame;
exports.markGameAsFavorite = markGameAsFavorite;
