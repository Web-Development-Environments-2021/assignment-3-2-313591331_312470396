const DButils = require("./DButils");

async function getGameUtils(game_id) {
  if (game_id.length === 0) return [];
  const gameIds =
    "(" +
    game_id.reduce((accumulator, game) => {
      return `${accumulator},${game}`;
    }) +
    ")";
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
    let game = await getGameUtils([game_id]);
    game = game[0];
    if (new Date(game.gameDate) < new Date()) {
      throw {
        status: 406,
        message: `you can't add occurred games to the favorite`,
      };
    }
    await DButils.execQuery(
      `insert into FavoriteGames values ('${user_id}',${game_id})`
    );
  } catch (err) {
    if (err.status === 406) throw err;
    if (err.number == 2627) {
      throw { status: 408, message: "Game already in your favorite list" };
    }
    throw { status: 404, message: `Game ${game_id} not found` };
  }
}
async function unmarkGameAsFavorite(user_id, game_id) {
  const res = await DButils.execQuery(
    `Select * FROM FavoriteGames WHERE (user_id ='${user_id}' AND game_id = '${game_id}')`
  );
  if (res.length === 0) {
    throw { status: 408, message: "Game wasn't in your favorite list" };
  }
  await DButils.execQuery(
    `DELETE FROM FavoriteGames WHERE (user_id ='${user_id}' AND game_id = '${game_id}')`
  );
}

const updateGameResult = async ({ gameID, homeTeamScore, awayTeamScore }) => {
  const game = await helperValidItsPreviousGame(gameID);
  await DButils.execQuery(
    `UPDATE Games SET homeScore = ${homeTeamScore}, awayScore = ${awayTeamScore} 
    WHERE gameID = ${gameID}`
  );
  return "game updated successfully";
};

const getAllGames = async () => {
  return await DButils.execQuery("SELECT * FROM dbo.Games ");
};

const getAllGamesFiltered = async (league_id, season_id, stage_id) => {
  return await DButils.execQuery(
    `SELECT * FROM dbo.Games WHERE leagueID='${league_id}' AND seasonID='${season_id}' AND stageID='${stage_id}' ORDER BY gameDate ASC `
  );
};

const addReport = async ({
  report_type,
  game_id,
  minute,
  player1_name,
  player1_id,
  player2_name,
  player2_id,
}) => {
  const game = await helperValidItsPreviousGame(game_id);
  player2_name
    ? await DButils.execQuery(
        `INSERT INTO dbo.GameReport (report_type,game_id,minute,player1_name,player1_id,player2_name,player2_id) VALUES ('${report_type}','${game_id}','${minute}','${player1_name}','${player1_id}','${player2_name}','${player2_id}')`
      )
    : await DButils.execQuery(
        `INSERT INTO dbo.GameReport (report_type,game_id,minute,player1_name,player1_id) VALUES ('${report_type}','${game_id}','${minute}','${player1_name}','${player1_id}')`
      );
};

const getGameReportsForGame = async (game_id) => {
  const res = await DButils.execQuery(
    `SELECT * FROM dbo.GameReport WHERE game_id = ${game_id}`
  );
  return res;
};
function filterUpcomingGames(lst) {
  const currentDate = new Date();
  return lst.filter((game) => new Date(game.gameDate) > currentDate);
}
async function filterPreviousGames(lst) {
  const currentDate = new Date();
  let older_games_and_events = [];
  let promises = [];
  lst = lst.filter((game) => new Date(game.gameDate) < currentDate);
  lst.map((game) => {
    promises.push(getGameReportsForGame(game.gameID));
  });
  await Promise.all(promises).then((values) => {
    lst.map((game, index) => {
      older_games_and_events.push({
        ...game,
        gameReport: values[index],
      });
    });
  });
  return older_games_and_events;
}
async function helperValidItsPreviousGame(game_id) {
  let game = await getGameUtils([game_id]);
  if (game.length < 1) {
    throw { status: 402, message: "game doesn't exist" };
  }
  game = game[0];
  if (new Date(game.gameDate) > new Date()) {
    throw { status: 403, message: "You can't add report to a future game." };
  }
  return game;
}

exports.getAllGames = getAllGames;
exports.getAllGamesFiltered = getAllGamesFiltered;
exports.addReport = addReport;
exports.getGameReportsForGame = getGameReportsForGame;
exports.updateGameResult = updateGameResult;
exports.getGameByTeam = getGameByTeam;
exports.getGameByStage = getGameByStage;
exports.addGame = addGame;
exports.markGameAsFavorite = markGameAsFavorite;
exports.filterUpcomingGames = filterUpcomingGames;
exports.filterPreviousGames = filterPreviousGames;
exports.unmarkGameAsFavorite = unmarkGameAsFavorite;
exports.getGameUtils = getGameUtils;
