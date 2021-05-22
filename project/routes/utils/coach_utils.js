const axios = require("axios");
async function getCoachUtils(coach_id) {
  const coach = await axios.get(
    `https://soccer.sportmonks.com/api/v2.0/coaches/${coach_id}`,
    {
      params: {
        api_token: process.env.api_token,
      },
    }
  );
  return {
    preview: {
      fullname: coach.data.data.fullname,
      team: coach.data.data.team_id,
      image_path: coach.data.data.image_path,
    },
    additional: {
      common_name: coach.data.data.common_name,
      nationality: coach.data.data.nationality,
      birthdate: coach.data.data.birthdate,
      birthcountry: coach.data.data.birthcountry,
    },
  };
}

async function getCoachByTeam(team_id) {
  const team = await axios.get(`${process.env.api_domain}/teams/${team_id}`, {
    params: {
      include: "coach",
      api_token: process.env.api_token,
    },
  });
  return team.data.data.coach.data;
}
exports.getCoachUtils = getCoachUtils;
exports.getCoachByTeam = getCoachByTeam;
