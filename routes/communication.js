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

router.post("/register_project", function (req, res, next) {
  let {
    com_name,
    com_date,
    com_title,
    com_simpleInfo,
    com_detailInfo,
    com_category,
    recommend_num,
    comment_num,
  } = req.body.projectForm;

  let query =
    "INSERT INTO communications (com_name,com_date,com_title,com_simpleInfo,com_detailInfo, com_category, recommend_num, comment_num) VALUES(?,?,?,?,?,?,?,?)";

  var param = [
    com_name,
    com_date,
    com_title,
    com_simpleInfo,
    com_detailInfo,
    com_category,
    recommend_num,
    comment_num,
  ];

  dbConnection((err, connection) => {
    connection.query(query, param, (err, rows) => {
      connection.release();
      if (err) {
        throw err;
      }
      console.log("===== insert project info into communications table =====");
      console.log(param);
      return res.send(true);
    });
  });
});

module.exports = router;
