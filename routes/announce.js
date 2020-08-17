const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.json([
    { id: 1, username: "some" },
    { id: 2, username: "one" },
  ]);
});

module.exports = router;
