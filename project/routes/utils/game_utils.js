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

const addGameResult = async ({gameID,homeTeamScore,awayTeamScore}) => {
  await DButils.execQuery(
    `UPDATE Games SET homeScore = ${homeTeamScore}, awayScore = ${awayTeamScore} 
    WHERE gameID = ${gameID}`
  );
  return `game_id ${gameID} result updated successfully
  homeTeam score ${homeTeamScore} awayTeam score ${awayTeamScore}`
}

const gelAllGames = async () => {
  return await DButils.execQuery("SELECT * FROM dbo.Games ");
}

const addReport = async ({report_type,game_id,minute,player1_name,player1_id,player2_name,player2_id}) => {
  player2_name ? 
  await DButils.execQuery(
    `INSERT INTO dbo.GameReport (report_type,game_id,minute,player1_name,player1_id,player2_name,player2_id) VALUES 
    ('${report_type}','${game_id}','${minute}','${player1_name}','${player1_id}','${player2_name}','${player2_id}')`) : 
  await DButils.execQuery(
    `INSERT INTO dbo.GameReport (report_type,game_id,minute,player1_name,player1_id) VALUES 
    ('${report_type}','${game_id}','${minute}','${player1_name}','${player1_id}')`)
}

const getGameReportsForGame = async (game_id) => {
  return DButils.execQuery(
    `SELECT * FROM dbo.GameReport WHERE game_id = ${game_id}`
  )
}


exports.addGameResult = addGameResult
exports.gelAllGames = gelAllGames
exports.addReport = addReport
exports.getGameReportsForGame = getGameReportsForGame
exports.getGameUtils = getGameUtils;
exports.getGameByTeam = getGameByTeam
exports.getGameByStage = getGameByStage
exports.addGame = addGame;
exports.markGameAsFavorite = markGameAsFavorite;

