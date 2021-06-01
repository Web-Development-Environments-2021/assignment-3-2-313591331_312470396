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
  // const dummyReport = await  game_utils.getGameReportsForGame(3)
  const currentDate = new Date()
  const result = {
    teamPreview: {
      id: team.id,
      name: team.name,
      shortCode: team.short_code,
      logo: team.logo_path,
    },
    players: player,
    upcoming_games: games.filter((game) => new Date(game.gameDate) > currentDate),
    previous_games: await Promise.all(
      games
        .filter((game) => new Date(game.gameDate) < currentDate)
        .map( async (game) => {
          return {
            ...game,
            gameReport: await game_utils.getGameReportsForGame(game.gameID),
          };
        })
    ),
  };
  return result
}

async function getTeamsInfo(teams_ids_list) {
  let promises = [];
  teams_ids_list.map((id) =>
    promises.push(
      axios.get(`${api_domain}/teams/${id}`, {
        params: {
          api_token: process.env.api_token,
        },
      })
    )
  );
  let team_info = await Promise.all(promises);
  return extractRelevantTeamData(team_info);
}

function extractRelevantTeamData(teams_info) {
  return teams_info.map((team_info) => {
    const a = team_info.data.data;
    const { id, name, short_code, logo_path } = team_info.data.data;
    return {
      name,
      logo_path,
      id,
      short_code,
    };
  });
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
exports.getTeamsInfo = getTeamsInfo;
exports.markTeamAsFavorite = markTeamAsFavorite;
