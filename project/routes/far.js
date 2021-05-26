var express = require("express");
var router = express.Router();
const farUtils = require("./utils/far_utils");
const far_auth = require("../middleware/mid_FAR");
router.use(far_auth);
router.post("/addReferee", async (req, res, next) => {
  try {
    const qualification = req.body.qualification;
    const user_id = req.body.user_id;
    if (qualification == null) {
      throw { status: 409, message: "You must provide qualification" };
    }
    if (user_id == null) {
      throw { status: 409, message: "You must provide user details" };
    }
    await farUtils.addRefereeUtils(user_id, qualification);
    res.status(201).send("Referee added successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
