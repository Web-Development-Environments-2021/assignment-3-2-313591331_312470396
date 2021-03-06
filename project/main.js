const DButils = require("./routes/utils/DButils");
const axios = require("axios");
const bcrypt = require("bcryptjs");
require("dotenv").config();
var express = require("express");
var path = require("path");
const session = require("client-sessions");
var logger = require("morgan");
var cors = require("cors");
var app = express();
app.use(logger("dev")); //logger
app.use(express.json()); // parse application/json
app.use(
  session({
    cookieName: "session", // the cookie key name
    secret: process.env.COOKIE_SECRET, // the encryption key
    duration: 24 * 60 * 60 * 1000, // expired after 20 sec
    activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration,
    cookie: {
      httpOnly: false,
    },
    //the session will be extended by activeDuration milliseconds
  })
);
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
// app.use(express.static(path.join(__dirname, "dist"))); //To serve static files such as images, CSS files, and JavaScript files
app.use(express.static("dist"));

app.get("/api", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
const port = process.env.PORT || "3000";
const auth = require("./routes/auth");
const users = require("./routes/users");
const league = require("./routes/league");
const team = require("./routes/team");
const dev = require("./routes/dev");
const coach = require("./routes/coach");
const player = require("./routes/player");
const far = require("./routes/far");
const game = require("./routes/game");
const stage = require("./routes/stage");
const search = require("./routes/search");
//#endregion
app.get("/alive", (req, res) => res.send("I'm alive"));
// Routings
app.use("/users", users);
app.use("/team", team);
app.use("/coach", coach);
app.use("/player", player);
app.use("/far", far);
app.use("/auth", auth);
app.use("/league", league);
app.use("/game", game);
app.use("/stage", stage);
app.use("/search", search);
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).send(err.message);
});

const server = app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
