const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
const mysql = require('../config/db');
const auth = require('../auth');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser('keyboard cat'));
router.use(session({ secret: 'keyboard cat' }));
router.use(passport.initialize());
router.use(passport.session());

router.get('/', function (req, res, next) {
  //쿠키정보가 있을경우 쿠키에 담긴 id값 전달
  var userId = '';
  if (req.cookies['loginId'] !== undefined) {
    //로그인 정보 있음
    console.log(req.cookies['loginId']);
    userId = req.cookies['rememberId'];
  }
  res.render('login.html', { userId: userId });
});

passport.serializeUser(function (user, done) {
  //로그인시, 딱한번 실행되면서 사용자 식별자를 세션스토어에 저장한다.
  //user정보를 식별할 수 있는 값인 id를 이용한 쿠키를 생성
  console.log('serializeUser ', user);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  // id를 이용해 user의 전체 정보를 받아온다.
  console.log('deserializeUser id ', id);
  var userinfo;
  var sql = 'SELECT * FROM USER WHERE ID=?';
  mysql.query(sql, [id], function (err, result) {
    if (err) console.log('mysql 에러');

    console.log('deserializeUser mysql result : ', result);
    var json = JSON.stringify(result[0]);
    userinfo = JSON.parse(json);
    done(null, userinfo);
  });
});

router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/login/general_login/success',
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
        console.log(result);
        var json = JSON.stringify(result[0]);
        var userinfo = JSON.parse(json);
        console.log('userinfo ' + userinfo);
        return done(null, userinfo); //userinfo 가 serializeUser 첫번째인자로 주입
      }
    });
  })
);

router.get('/success', (req, res) => {
  console.log('성공하였는가', req.user); //passport를 사용해서 request 객체에 user를 주입
  res.render('success.html', { status: auth.statusUI(req, res) });
});

router.get('/logout', function (req, res, next) {
  console.log('logout');
  req.session.destroy();
  req.logout();
  res.redirect('/login');
});

module.exports = router;
