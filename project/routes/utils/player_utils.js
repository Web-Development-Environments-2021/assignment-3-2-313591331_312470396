const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const DButils = require("./DButils");
async function getPlayerUtils(player_id) {
  const player = await axios.get(`${api_domain}/players/${player_id}`, {
    params: {
      api_token: process.env.api_token,
      include: "team",
    },
  });
  return {
    preview: {
      player_id: player_id,
      name: player.data.data.fullname,
      team_name: player.data.data.team.data.name,
      image: player.data.data.image_path,
      position: player.data.data.position_id,
    },
    additional: {
      common_name: player.data.data.common_name,
      nationality: player.data.data.nationality,
      birthdate: player.data.data.birthdate,
      birthcountry: player.data.data.birthcountry,
      height: player.data.data.height,
      weight: player.data.data.weight,
    },
  };
}

async function getPlayerIdsByTeam(team_id) {
  let player_ids_list = [];
  const team = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
      include: "squad",
      api_token: process.env.api_token,
    },
  });
  team.data.data.squad.data.map((player) =>
    player_ids_list.push(player.player_id)
  );
  return player_ids_list;
}

async function getPlayersInfo(players_ids_list) {
  let promises = [];
  players_ids_list.map((id) =>
    promises.push(
      axios.get(`${api_domain}/players/${id}`, {
        params: {
          api_token: process.env.api_token,
          include: "team",
        },
      })
    )
  );
  let players_info = await Promise.all(promises);
  return extractRelevantPlayerData(players_info);
}

function extractRelevantPlayerData(players_info) {
  const playersData = [];
  players_info.map((player_info) => {
    if (
      player_info.data != null &&
      player_info.data.error != null &&
      player_info.data.error.code == 429
    ) {
      throw { status: 429, message: "Out of tokens in SportMonks API." };
    }
    const { player_id, fullname, image_path, position_id } =
      player_info.data.data;
    const { name } = player_info.data.data.team.data;
    playersData.push({ player_id, fullname, image_path, position_id, name });
  });
  return playersData;
}

async function getPlayersByTeam(team_id) {
  let player_ids_list = await getPlayerIdsByTeam(team_id);
  let players_info = await getPlayersInfo(player_ids_list);
  return players_info;
}

async function markPlayerAsFavorite(user_id, player_id) {
  await getPlayerUtils(player_id).catch((err) => {
    throw { status: 404, message: "Player " + player_id + "not found" };
  });
  await DButils.execQuery(
    `insert into FavoritePlayers values ('${user_id}',${player_id})`
  ).catch((err) => {
    if (err.number == 2627) {
      throw { status: 408, message: "Player already in your favorite list" };
    }
    throw err;
  });
}

async function unmarkPlayerAsFavorite(user_id, player_id) {
  await getPlayerUtils(player_id).catch((err) => {
    throw { status: 404, message: "Player " + player_id + "not found" };
  });
  const res = await DButils.execQuery(
    `Select * FROM FavoritePlayers WHERE (user_id ='${user_id}' AND player_id = '${player_id}')`
  );
  if (res.length === 0) {
    throw { status: 408, message: "Player wasn't in your favorite list" };
  }
  await DButils.execQuery(
    `DELETE FROM FavoritePlayers WHERE (user_id ='${user_id}' AND player_id = '${player_id}')`
  );
}

async function getPlayerByName(player_name, filter_team, filter_position) {
  const player = await axios.get(
    `${api_domain}/players/search/${player_name}`,
    {
      params: {
        api_token: process.env.api_token,
      },
    }
  );
  if (player.data.data.length > 0) {
    return extractRelevantPlayerDataForSearch(
      player.data.data,
      filter_team,
      filter_position
    );
  } else {
    throw { status: 404, message: "Player: " + player_name + " not found." };
  }
}
function extractRelevantPlayerDataForSearch(
  players_info,
  filter_team,
  filter_position
) {
  if (filter_team) {
    players_info = players_info.filter((player) => {
      return player.team_id == filter_team;
    });
  }
  if (filter_position) {
    players_info = players_info.filter((player) => {
      return player.position_id == filter_position;
    });
  }
  return players_info.map((player_info) => {
    const { fullname, image_path, position_id, team_id } = player_info;
    return {
      name: fullname,
      team_name: team_id,
      image: image_path,
      position: position_id,
    };
  });
}
exports.getPlayersByTeam = getPlayersByTeam;
exports.getPlayersInfo = getPlayersInfo;
exports.getPlayerUtils = getPlayerUtils;
exports.markPlayerAsFavorite = markPlayerAsFavorite;
exports.getPlayerByName = getPlayerByName;
exports.unmarkPlayerAsFavorite = unmarkPlayerAsFavorite;
