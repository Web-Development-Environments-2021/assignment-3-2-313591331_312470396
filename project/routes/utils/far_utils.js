const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const DButils = require("../utils/DButils");
async function addRefereeUtils(user_id, qualification) {
  const user = (
    await DButils.execQuery(
      `SELECT * FROM dbo.Users WHERE user_id = '${user_id}'`
    )
  )[0];
  if (user === undefined) {
    throw { status: 420, message: "There is no such user " };
  }
  if (user.type !== "Fan") {
    throw { status: 409, message: "user already has type of: " + user.type };
  }
  await DButils.execQuery(
    `INSERT INTO dbo.Referees (user_id,qualification) VALUES ('${user_id}','${qualification}')`
  );
}

exports.addRefereeUtils = addRefereeUtils;
