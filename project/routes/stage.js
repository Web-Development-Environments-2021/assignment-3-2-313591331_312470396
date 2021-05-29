var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const stage_utils = require("./utils/stage_utils")
// const player_utils = require("./utils/player_utils");
// const coach_utils = require("./utils/coach_utils");

router.get("/:stageID", async (req, res, next) => {
  try {
    const stagePage = await stage_utils.getStagePage(req.params.stageID)
    //we should keep implementing team page.....
    res.send(stagePage);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
