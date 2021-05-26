const axios = require("axios");
const LEAGUE_ID = 271;

async function getLeagueDetails() {
  const league = await axios.get(
    `https://soccer.sportmonks.com/api/v2.0/leagues/${LEAGUE_ID}`,
    {
      params: {
        include: "season",
        api_token: process.env.api_token,
      },
    }
  );
  const stage = await axios.get(
    `https://soccer.sportmonks.com/api/v2.0/stages/${league.data.data.current_stage_id}`,
    {
      params: {
        api_token: process.env.api_token,
      },
    }
  );
  const games = await axios.get(
    `https://soccer.sportmonks.com/api/v2.0/seasons/${league.data.data.current_season_id}`,
    {
      params: {
        api_token: process.env.api_token,
        include:"upcoming,results"
      },
    }
  )
  const upcomingGamesArray = games.data.data.upcoming.data
  return {
    leagueName: league.data.data.name,
    leagueID: league.data.data.id,
    currentSeasonName: league.data.data.season.data.name,
    currentSeasonId: league.data.data.season.data.id,
    currentStageName: stage.data.data.name,
    currentStageId: stage.data.data.id,
    upcomingGame:upcomingGamesArray[upcomingGamesArray.length-1], //change to games from DB
    // next game details should come from DB
  };
}
exports.getLeagueDetails = getLeagueDetails;
