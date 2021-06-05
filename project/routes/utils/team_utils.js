const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const DButils = require("./DButils");
const player_utils = require("./player_utils");
const game_utils = require("./game_utils");

async function getTeamUtils(team_id) {
  let team = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
      api_token: process.env.api_token,
      include: "coach",
    },
  });
  team = { ...team.data.data };
  const players = await player_utils.getPlayersByTeam(team_id);
  const games = await game_utils.getGameByTeam(team_id);
  previous_games = await game_utils.filterPreviousGames(games);
  const result = {
    teamPreview: {
      id: team.id,
      name: team.name,
      shortCode: team.short_code,
      logo: team.logo_path,
      coach_id: team.coach.data.coach_id,
      coach_fullname: team.coach.data.fullname,
    },
    players: players,
    games: {
      upcoming_games: game_utils.filterUpcomingGames(games),
      previous_games: previous_games,
    },
  };
  return result;
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
    const { id, name, short_code, logo_path } = team_info.data.data;
    return {
      id,
      name,
      shortCode: short_code,
      logo: logo_path,
    };
  });
}

async function markTeamAsFavorite(user_id, team_id) {
  await helperValidTeamExist(team_id).catch((err) => {
    throw { status: 404, message: "Team not found" };
  });
  await DButils.execQuery(
    `insert into FavoriteTeams values ('${user_id}',${team_id})`
  ).catch((err) => {
    throw { status: 408, message: "Team already in your favorite list" };
  });
}

async function unmarkTeamAsFavorite(user_id, team_id) {
  await helperValidTeamExist(team_id).catch((err) => {
    throw { status: 404, message: "Team not found" };
  });
  const res = await DButils.execQuery(
    `Select * FROM FavoriteTeams WHERE (user_id ='${user_id}' AND team_id = '${team_id}')`
  );
  if (res.length === 0) {
    throw { status: 408, message: "Team wasn't in your favorite list" };
  }
  await DButils.execQuery(
    `DELETE FROM FavoriteTeams WHERE (user_id ='${user_id}' AND team_id = '${team_id}')`
  );
}

async function getTeamByName(team_name) {
  const teams = await axios.get(`${api_domain}/teams/search/${team_name}`, {
    params: {
      api_token: process.env.api_token,
    },
  });
  if (teams.data.data.length > 0)
    return extractRelevantTeamDataForSearch(teams.data.data);
  else {
    throw { status: 404, message: "Team: " + team_name + " not found." };
  }
}

function extractRelevantTeamDataForSearch(teams_info) {
  return teams_info.map((team_info) => {
    const { id, name, logo_path } = team_info;
    return {
      id,
      name,
      logo: logo_path,
    };
  });
}
async function helperValidTeamExist(team_id) {
  //If there is no team, An excpetion will be throned.
  let team = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
      api_token: process.env.api_token,
    },
  });
}
exports.getTeamUtils = getTeamUtils;
exports.getTeamsInfo = getTeamsInfo;
exports.markTeamAsFavorite = markTeamAsFavorite;
exports.extractRelevantTeamDataForSearch = extractRelevantTeamDataForSearch;
exports.getTeamByName = getTeamByName;
exports.unmarkTeamAsFavorite = unmarkTeamAsFavorite;
