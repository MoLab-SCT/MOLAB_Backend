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

  let fileSrc = "";

  if (req.file) {
    fileSrc = req.file.path;
  }

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

router.post("/project/submit_comment", function (req, res) {
  let { loginName, date, comment, com_no } = req.body;
  dbConnection((err, connection) => {
    let query =
      "INSERT INTO com_comment (com_no, username, comment, date) VALUES(?,?,?,?)";
    let param = [com_no, loginName, comment, date];
    connection.query(query, param, (err, rows) => {
      connection.release();
      if (err) {
        throw err;
      }
      console.log("===== insert comment info into com_comment table =====");
      console.log(param);
      return res.send(true);
    });
  });
});

router.post("/project/get_comment", function (req, res) {
  let { com_no } = req.body;
  dbConnection((err, connection) => {
    connection.query(
      "SELECT * FROM com_comment where com_no=" + com_no,
      (err, rows) => {
        connection.release();
        console.log(rows);
        if (err) {
          throw err;
        }
        return res.json(rows);
      }
    );
  });
});

function likeList(com_no, res) {
  dbConnection((err, connection) => {
    connection.query(
      "SELECT username FROM com_like where com_no=" + com_no,
      (err, rows) => {
        connection.release();
        console.log(rows);
        if (err) {
          throw err;
        }
        var json = JSON.stringify(rows);
        var userinfo = JSON.parse(json);
        return res.send(userinfo);
      }
    );
  });
}

router.post("/project/get_like", function (req, res) {
  let { com_no } = req.body;
  likeList(com_no, res);
});

router.post("/project/click_like", function (req, res) {
  let { com_no, loginId, likeStatus } = req.body;
  console.log(likeStatus);

  const likeEvent = (query, param, com_no) => {
    dbConnection((err, connection) => {
      connection.query(query, param, (err, rows) => {
        connection.release();
        if (err) {
          throw err;
        }
        console.log("===== handle click event from com_like table =====");
        console.log(param);
        likeList(com_no, res);
      });
    });
  };

  if (likeStatus) {
    let query = "DELETE FROM com_like WHERE com_no = ? AND username = ?";
    let param = [com_no, loginId];
    likeEvent(query, param, com_no);
  } else {
    let query = "INSERT INTO com_like (com_no, username) VALUES(?,?)";
    let param = [com_no, loginId];
    likeEvent(query, param, com_no);
  }
});

module.exports = router;
