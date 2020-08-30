const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const mysql = require('../config/db');
const username_status = require('./username');
const config = require('config');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser('keyboard cat'));
router.use(session({ secret: 'keyboard cat' }));
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, done) {
  console.log('==serializeUser==');
  console.log(user);
  if (user.id) {
    done(null, user.id);
  } else {
    done(null, user);
  }
});

passport.deserializeUser(function (user, done) {
  if (user.provider) {
    console.log('==deserialize user==');
    console.log(user);
    done(null, user);
  } else {
    var id = user;
    var userinfo;
    var sql = 'SELECT * FROM USER WHERE ID=?';
    mysql.query(sql, [id], function (err, result) {
      if (err) console.log('mysql 에러');

      console.log('==deserializeUser user==');
      console.log(result);
      var json = JSON.stringify(result[0]);
      userinfo = JSON.parse(json);
      done(null, userinfo);
    });
  }
});

//general_login

router.get('/', function (req, res, next) {
  //쿠키정보가 있을경우 쿠키에 담긴 id값 전달
  var userId = '';
  if (req.cookies['loginId'] !== undefined) {
    //로그인 정보 있음
    console.log(req.cookies['loginId']);
    userId = req.cookies['rememberId'];
  }
  res.render('index.html', { userId: userId });
});

router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/login/success',
    failureRedirect: '/login',
  })
);

passport.use(
  new LocalStrategy(function (username, password, done) {
    var sql = 'SELECT * FROM USER WHERE ID=? AND PASSWORD=? ';
    mysql.query(sql, [username, password], function (err, result) {
      if (err) console.log('mysql 에러');
      if (result.length === 0) {
        console.log('결과 없음');
        return done(null, false, { message: 'Incorrect' });
      } else {
        console.log('==result== ');
        console.log(result);
        var json = JSON.stringify(result[0]);
        var userinfo = JSON.parse(json);
        return done(null, userinfo);
      }
    });
  })
);

//kakao_login
router.get('/kakao', passport.authenticate('login-kakao'));

passport.use(
  'login-kakao',
  new KakaoStrategy(
    {
      clientID: config.get('kakao').get('clientID'),
      callbackURL: config.get('kakao').get('callbackURL'),
    },
    function (accessToken, refreshToken, profile, done) {
      var user = {
        name: profile.username,
        email: profile._json.kakao_account.email,
        provider: 'kakao',
      };
      console.log('==kakao_user==');
      console.log(user);
      return done(null, user);
    }
  )
);

router.get(
  '/kakao/callback',
  passport.authenticate('login-kakao', {
    successRedirect: '/login/success',
    failureRedirect: '/login',
  })
);

//naver_login
router.get('/naver', passport.authenticate('naver'));

passport.use(
  'naver',
  new NaverStrategy(
    {
      clientID: config.get('naver').get('clientID'),
      clientSecret: config.get('naver').get('clientSecret'),
      callbackURL: config.get('naver').get('callbackURL'),
    },
    function (accessToken, refreshToken, profile, done) {
      var user = {
        name: profile.displayName,
        email: profile.emails[0].value,
        username: profile.displayName,
        provider: 'naver',
        naver: profile._json,
      };
      console.log('==naver_user==');
      console.log(user);
      return done(null, user);
    }
  )
);

router.get(
  '/naver/callback',
  passport.authenticate('naver', {
    successRedirect: '/login/success',
    failureRedirect: '/login',
  })
);

//success & logout

const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(301).redirect('/login');
  }
};

router.get('/success', authenticateUser, (req, res) => {
  res.render('success.html', { status: username_status.statusUI(req, res) });
});

router.get('/logout', function (req, res, next) {
  console.log('logout');
  req.session.destroy();
  req.logout();
  res.redirect('/login');
});

module.exports = router;
