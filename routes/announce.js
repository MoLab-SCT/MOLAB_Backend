const express = require("express");
const router = express.Router();
var Model = require("../models/index");

router.get("/", async (req, res, next) => {
  Model.Announce.findAll({
    raw: true,
  })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
