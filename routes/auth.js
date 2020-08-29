var express = require("express");
var router = express.Router();

router.get("/islogin", function (req, res, next) {
  console.log("===== isAuthenticated process =====");
  console.log(req.isAuthenticated());
  if (req.user) {
    res.send(true);
  } else {
    res.send(false);
  }
});

router.get("/logout", function (req, res, next) {
  console.log("===== logout =====");
  req.logout();
  req.session.save(function () {
    res.send(true);
  });
});

module.exports = router;
