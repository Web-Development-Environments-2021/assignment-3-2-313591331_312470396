var express = require("express");
var router = express.Router();
const stage_utils = require("./utils/stage_utils");

router.get("/:stageID", async (req, res, next) => {
  try {
    const stagePage = await stage_utils.getStagePage(req.params.stageID);
    res.send(stagePage);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
