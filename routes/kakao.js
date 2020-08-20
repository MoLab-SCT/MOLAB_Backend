const express = require('express');
const router = express.Router();
const config = require('config');
const auth = require('../auth');

const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

router.use(passport.initialize());
router.use(passport.session());

// localhost:3000/login/kakao로 들어오면(get으로 들어오면) passport.authenticate를 실행(여기서는 임의로 login-kakao로 이름을 줌)
router.get('/', passport.authenticate('login-kakao'));

passport.serializeUser(function (user, done) {
  console.log('serializeUser', user);
  done(null, user.id);
});

passport.deserializeUser(function (user, done) {
  console.log('deserialize user ', user);
  done(null, user);
});

// 이름을 login-kakao로 임의로 주었습니다 그래서 /kakao로 들어오면 아래가 실행이 됩니다
passport.use(
  'login-kakao',
  new KakaoStrategy(
    {
      clientID: config.get('kakao').get('clientID'),
      callbackURL: config.get('kakao').get('callbackURL'), // 카카오 개발자 사이트에서 지정한 리다이렉트 URL
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      return done(null, profile);
    }
  )
);

router.get(
  '/callback',
  passport.authenticate('login-kakao', {
    successRedirect: '/login/kakao/success', // 성공하면 /main으로 가도록
    failureRedirect: '/login',
  })
);

router.get('/success', (req, res) => {
  res.render('success.html', { status: auth.statusUI(req, res) });
});

router.get('/logout', (req, res) => {
  console.log('logout');
  req.session = null;
  req.logout();
  res.redirect('/login');
});

module.exports = router;
