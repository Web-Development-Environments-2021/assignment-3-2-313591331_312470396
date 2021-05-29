const { NText } = require("mssql");
const DButils = require("./DButils");

async function getGameUtils(game_id) {
  const gameIds = "(" + game_id.reduce((accumulator,id) => `${accumulator},${id}`) + ")"
  console.log(gameIds)
  const gamesData = await DButils.execQuery(
    `SELECT * FROM [dbo].[Games] WHERE gameID IN ${gameIds}`
  );
  return gamesData;
}

async function getGameByTeam(team_id) {
  const gamesData = await DButils.execQuery(
    `SELECT  *
    FROM  [dbo].[Games]
    WHERE homeTeamID = ${team_id} OR awayTeamID = ${team_id}`
  );
  return gamesData;
}

async function getGameByStage(stage_id) {
  const gamesData = await DButils.execQuery(
    `SELECT  *
    FROM  [dbo].[Games]
    WHERE stageID = ${stage_id}`
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

exports.getGameUtils = getGameUtils;
exports.getGameByTeam = getGameByTeam
exports.getGameByStage = getGameByStage
exports.addGame = addGame;
exports.markGameAsFavorite = markGameAsFavorite;
