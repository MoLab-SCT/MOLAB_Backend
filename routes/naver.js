const express = require('express');
const router = express.Router();
const config = require('config');
const auth = require('../auth');

const passport = require('passport'); //passport 추가
const NaverStrategy = require('passport-naver').Strategy;

router.use(passport.initialize());
router.use(passport.session());

//failed to serialize user into session 에러 발생 시 아래의 내용을 추가 한다.
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (req, user, done) {
  // passport로 로그인 처리 후 해당 정보를 session에 담는다.
  req.session.sid = user.name;
  console.log('Session Check :' + req.session.sid);
  done(null, user);
});

passport.use(
  new NaverStrategy(
    {
      clientID: config.get('naver').get('clientID'),
      clientSecret: config.get('naver').get('clientSecret'),
      callbackURL: config.get('naver').get('callbackURL'),
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        var user = {
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.displayName,
          provider: 'naver',
          naver: profile._json,
        };
        console.log('user=');
        console.log(user);
        return done(null, user);
      });
    }
  )
);

router.get('/', passport.authenticate('naver', null), function (req, res) {
  console.log('/naver failed, stopped');
});

//처리 후 callback 처리 부분 성공/실패 시 리다이렉트 설정
router.get(
  '/callback',
  passport.authenticate('naver', {
    successRedirect: '/login/naver/success',
    failureRedirect: '/login',
  })
);

router.get('/success', (req, res) => {
  console.log('성공했나 naver', req.user);
  res.render('success.html', { status: auth.statusUI(req, res) });
});

router.get('/logout', (req, res) => {
  console.log('logout');
  req.session = null;
  req.logout();
  res.redirect('/login');
});

module.exports = router;
