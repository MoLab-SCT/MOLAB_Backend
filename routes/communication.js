const express = require("express");
const router = express.Router();
const dbConnection = require("../config/connection");

router.get("/", function (req, res, next) {
  console.log(req.user);
  dbConnection((err, connection) => {
    connection.query("SELECT * FROM communications", (err, rows) => {
      connection.release();
      console.log(rows);
      if (err) {
        throw err;
      }
      return res.json(rows);
    });
  });
});

module.exports = router;
