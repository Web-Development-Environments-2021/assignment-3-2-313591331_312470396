var express = require("express");
var router = express.Router();
const DButils = require("../routes/utils/DButils");
const bcrypt = require("bcryptjs");

router.post("/Register", async (req, res, next) => {
  try {
    const users = await DButils.execQuery("SELECT username FROM dbo.Users");

    if (users.find((x) => x.username === req.body.username))
      throw { status: 409, message: "Username taken" };
    //hash the password
    let hash_password = bcrypt.hashSync(
      req.body.password,
      parseInt(process.env.bcrypt_saltRounds)
    );
    req.body.password = hash_password;
    await DButils.execQuery(
      `INSERT INTO dbo.Users (username,firstname,lastname,country,email,img,password,type) VALUES ('${req.body.username}','${req.body.firstname}','${req.body.lastname}','${req.body.country}','${req.body.email}','${req.body.img}','${hash_password}','${req.body.type}')`
    );
    res.status(201).send("User " + req.body.username + " created Successfully");
  } catch (error) {
    next(error);
  }
});

router.post("/Login", async (req, res, next) => {
  try {
    const user = (
      await DButils.execQuery(
        `SELECT * FROM dbo.Users WHERE username = '${req.body.username}'`
      )
    )[0];
    // check that username exists & the password is correct
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      throw { status: 401, message: "Username or Password incorrect" };
    }

    // Set cookie
    req.session.user_id = user.user_id;
    req.session.type = user.type;
    console.log(user);

    // return cookie
    res.status(200).send({ username: user.username, image: user.img });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", function (req, res) {
  if (req.session && !req.session.user_id) {
    throw { status: 401, message: "You must be logged in to do: logout" };
  }
  req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
  res.status(201).send("user logout succeeded");
});

module.exports = router;
