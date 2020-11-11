var express = require("express");
var router = express.Router();
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  NaverStrategy = require("passport-naver").Strategy,
  KakaoStrategy = require("passport-kakao").Strategy;
const dbConnection = require("../config/connection");
const config = require("../config/default.json");

const RSA = require("node-rsa");
const fs = require("fs");
const rsa = new RSA();
var rsaPublic = fs.readFileSync(__dirname + "/../public/rsa/public_key.pem");
var rsaPrivate = fs.readFileSync(__dirname + "/../public/rsa/private.key");

rsa.importKey(rsaPrivate, "private");
const privateKey = rsa.exportKey("private");
rsa.importKey(rsaPublic, "public");
const publicKey = rsa.exportKey("public");

router.get("/", function (req, res, next) {
  if (Object.keys(req.query).length === 0) {
    try {
      res.send(publicKey);
    } catch (e) {
      console.log(e);
    }
  }
});

passport.serializeUser(function (user, done) {
  console.log("===== serializeUser ======");
  console.log(user);
  if (user.id) {
    done(null, user.id);
  } else {
    done(null, user);
  }
});

passport.deserializeUser(function (user, done) {
  if (user.provider) {
    console.log("===== deserializeUser ======");
    console.log(user);
    done(null, user);
  } else {
    let userinfo;
    dbConnection((err, connection) => {
      var id = user;
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
  }
});

router.get("/kakao", passport.authenticate("login-kakao"));

passport.use(
  "login-kakao",
  new KakaoStrategy(
    {
      clientID: config.kakao.clientID,
      callbackURL: config.kakao.callbackURL,
    },
    function (accessToken, refreshToken, profile, done) {
      var user = {
        name: profile.username,
        email: profile._json.kakao_account.email,
        provider: "kakao",
      };
      console.log("==kakao_user==");
      console.log(user);
      return done(null, user);
    }
  )
);

router.get(
  "/kakao/callback",
  passport.authenticate("login-kakao", {
    successRedirect: "/login/success",
    failureRedirect: "/login",
  })
);

router.get("/naver", passport.authenticate("naver"));

passport.use(
  "naver",
  new NaverStrategy(
    {
      clientID: config.naver.clientID,
      clientSecret: config.naver.clientSecret,
      callbackURL: config.naver.callbackURL,
    },
    function (accessToken, refreshToken, profile, done) {
      var user = {
        name: profile.displayName,
        email: profile.emails[0].value,
        username: profile.displayName,
        provider: "naver",
        naver: profile._json,
      };
      console.log("==naver_user==");
      console.log(user);
      return done(null, user);
    }
  )
);

router.get(
  "/naver/callback",
  passport.authenticate("naver", {
    successRedirect: "/login/success",
    failureRedirect: "/login",
  })
);

const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(301).redirect("/login");
  }
};

router.get("/success", authenticateUser, (req, res) => {
  return res.redirect("http://localhost:3000");
});

/* for local login */
router.post("/general_login", function (req, res, next) {
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
      res.json(true);
    });
  })(req, res, next);
});

passport.use(
  new LocalStrategy(
    { usernameField: "id", passwordField: "encPw", session: true },
    function (username, password, done) {
      console.log("===== localStrategy process =====");
      password = rsa.decrypt(password, "utf-8");
      console.log(password);
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
