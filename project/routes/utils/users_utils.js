const DButils = require("./DButils");

async function markPlayerAsFavorite(user_id, player_ids) {
  let promises = [];
  const playersExist = await DButils.execQuery(
    `SELECT * FROM dbo.favoritePlayers WHERE user_id = '${user_id}'`
  );
  // if (player_ids.length + playersExist.length > 3) {
  //   throw {
  //     status: 409,
  //     message: `There are already ${playersExist.length} players that belongs to your account.\nYou Tried to add ${player_ids.length} more.\nMax fav players are 3.`,
  //   };
  // }

  player_ids.map((id) => {
    if (playersExist.indexOf(id)) {
      throw {
        status: 409,
        message:
          "Player " + id + " already in favorite list. Action cancelled.",
      };
    }
    promises.push(
      DButils.execQuery(
        `insert into FavoritePlayers values ('${user_id}',${id})`
      )
    );
  });
  await Promise.all(promises);
}

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


exports.markPlayerAsFavorite = markPlayerAsFavorite;
exports.getFavoritePlayers = getFavoritePlayers;
exports.getFavoriteTeams = getFavoriteTeams;
exports.getFavoriteGames = getFavoriteGames;
