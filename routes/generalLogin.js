var express = require("express");
var router = express.Router();
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const dbConnection = require("../config/connection");
const auth = require("./auth");

/* for login process */
router.post("/", function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      next(err);
    }
    if (!user) {
      return res.redirect("/");
    }
    req.logIn(user, (err) => {
      if (err) {
        next(err);
      }
      res.json({ redirectURI: "/" });
    });
  })(req, res, next);
});

passport.serializeUser(function (user, done) {
  console.log("===== serializeUser ======");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let userinfo;
  dbConnection((err, connection) => {
    connection.query("SELECT * FROM USER WHERE ID=?", [id], (err, result) => {
      connection.release();
      if (err) {
        console.log("mysql query send error");
        throw err;
      } else {
        console.log("===== deserializeUser ======");
        console.log(result);
        var json = JSON.stringify(result[0]);
        userinfo = JSON.parse(json);
        done(null, userinfo);
      }
    });
  });
});

passport.use(
  new LocalStrategy(
    { usernameField: "id", passwordField: "pwd", session: true },
    function (username, password, done) {
      console.log("===== localStrategy process =====");
      dbConnection((err, connection) => {
        connection.query(
          "SELECT * FROM USER WHERE ID=? AND PASSWORD=?",
          [username, password],
          (err, result) => {
            connection.release();
            console.log(result);
            if (err) {
              console.log("mysql query send error");
              throw err;
            }
            if (result.length === 0) {
              console.log("no matched result");
              return done(null, false, { message: "Incorrect" });
            } else {
              var json = JSON.stringify(result[0]);
              var userinfo = JSON.parse(json);
              console.log("===== successfully find result =====");
              console.log(userinfo);
              return done(null, userinfo);
            }
          }
        );
      });
    }
  )
);

module.exports = router;
