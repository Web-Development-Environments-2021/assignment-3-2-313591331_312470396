const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";

async function getTeamUtils(team_id) {
  let team = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
      include: "coach,squad",
      api_token: process.env.api_token,
    },
  });
  team = {...team.data.data}
  return {
    id: team.id,
    name: team.name,
    shortCode: team.short_code,
    logo: team.logo_path,
    players: team.squad.data,
    coach: team.coach.data
  };
}

exports.getTeamUtils = getTeamUtils