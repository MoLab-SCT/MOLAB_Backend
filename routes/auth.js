var express = require("express");
var router = express.Router();

/* check is user loginned */
router.get("/islogin", function (req, res, next) {
  console.log("===== isAuthenticated process =====");
  console.log(req.isAuthenticated());
  if (req.user) {
    res.send(true);
  } else {
    res.send(false);
  }
});

/* passport logout */
router.get("/logout", function (req, res, next) {
  console.log("===== logout =====");
  req.logout();
  req.session.save(function () {
    res.send(true);
  });
});

router.get("/getUser", function (req, res, next) {
  console.log("===== get user info =====");
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.send(req.user);
  } else {
    console.log("can not find user!");
  }
});

module.exports = router;
