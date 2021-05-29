const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const DButils = require("./DButils");
const player_utils = require("./player_utils");
const game_utils = require("./game_utils");
async function getTeamUtils(team_id) {
  let team = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
      api_token: process.env.api_token,
    },
  });
  team = { ...team.data.data };
  const player = await player_utils.getPlayersByTeam(team_id);
  // const player = "Error";
  const games = await game_utils.getGameByTeam(team_id);
  return {
    teamPreview: {
      id: team.id,
      name: team.name,
      shortCode: team.short_code,
      logo: team.logo_path,
    },
    players: player,
    upcoming_games: games.filter((game) => new Date(game.date) > currentDate),
    previous_games: games
      .filter((game) => new Date(game.date) < currentDate)
      .map((game) => {
        return {
          ...game,
          gameReport: await game_utils.getGameReport(game.gameID),
        };
      }),
  };
}

async function markTeamAsFavorite(user_id, team_id) {
  try {
    await getTeamUtils(team_id);
  } catch (error) {
    throw { status: 404, message: "Team " + team_id + " doesn't exist!" };
  }
  DButils.execQuery(
    `insert into FavoriteTeams values ('${user_id}',${team_id})`
  );
}

exports.getTeamUtils = getTeamUtils;
exports.markTeamAsFavorite = markTeamAsFavorite;
