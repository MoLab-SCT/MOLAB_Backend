const express = require("express");
const router = express.Router();
const path = require("path");
var multer = require("multer");
const dbConnection = require("../config/connection");

/* AWS S3 버킷 사용 */
const _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png"
    ) {
      cb(null, "./public/upload/img");
    } else if (
      file.mimetype == "application/pdf" ||
      file.mimetype == "application/txt" ||
      file.mimetype == "application/octet-stream"
    ) {
      cb(null, "./public/upload/text");
    }
  },
});

const upload = multer({ storage: _storage });

router.get("/", function (req, res, next) {
  dbConnection((err, connection) => {
    connection.query("SELECT * FROM communications", (err, rows) => {
      connection.release();
      if (err) {
        throw err;
      }
      return res.json(rows);
    });
  });
});

router.post("/register_project", upload.single("file"), function (req, res) {
  let {
    com_name,
    com_date,
    com_title,
    com_simpleInfo,
    com_detailInfo,
    com_category,
    recommend_num,
    comment_num,
  } = JSON.parse(req.body.projectForm);

  let fileSrc = req.file.path;

  let query =
    "INSERT INTO communications (com_name, com_date, com_title, com_simpleInfo, com_detailInfo, com_category, recommend_num, comment_num, file_src) VALUES(?,?,?,?,?,?,?,?,?)";

  var param = [
    com_name,
    com_date,
    com_title,
    com_simpleInfo,
    com_detailInfo,
    com_category,
    recommend_num,
    comment_num,
    fileSrc,
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
