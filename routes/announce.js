const express = require("express");
const router = express.Router();
const dbConnection = require("../config/db");

router.get("/", function (req, res, next) {
  dbConnection((err, connection) => {
    connection.query("SELECT * FROM announces", (err, rows) => {
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
