const express = require("express");
const router = express.Router();
const dbConnection = require("../config/connection");

router.get("/", function (req, res) {
  dbConnection((err, connection) => {
    connection.query("SELECT * FROM announce", (err, rows) => {
      connection.release();
      console.log(rows);
      if (err) {
        throw err;
      }
      return res.json(rows);
    });
  });
});

router.get("/:idx", function (req, res) {
  let idx = req.params.idx;
  let sql = "select * from announce where no = ?";
  dbConnection((err, connection) => {
    connection.query(sql, [idx], (err, row) => {
      connection.release();
      if (err) {
        throw err;
      }
      return res.json(row[0]);
    });
  });
});

router.post("/submit_comment", function (req, res) {
  let { loginName, date, comment, an_no } = req.body;
  dbConnection((err, connection) => {
    let query =
      "INSERT INTO an_comment (an_no, username, comment, date) VALUES(?,?,?,?)";
    let param = [an_no, loginName, comment, date];
    connection.query(query, param, (err, rows) => {
      connection.release();
      if (err) {
        throw err;
      }
      return res.send(true);
    });
  });
});

router.post("/get_comment", function (req, res) {
  let { no_detail } = req.body;
  dbConnection((err, connection) => {
    connection.query(
      "SELECT * FROM an_comment where an_no=" + no_detail,
      (err, rows) => {
        connection.release();
        if (err) {
          throw err;
        }
        return res.json(rows);
      }
    );
  });
});

function likeList(no_detail, res) {
  dbConnection((err, connection) => {
    connection.query(
      "SELECT username FROM an_like where an_no=" + no_detail,
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

router.post("/get_like", function (req, res) {
  let { no_detail } = req.body;
  likeList(no_detail, res);
});

router.post("/click_like", function (req, res) {
  let { no_detail, loginId, likeStatus } = req.body;

  const likeEvent = (query1, param1, query2, param2, no_detail) => {
    dbConnection((err, connection) => {
      connection.query(query2, param2, (err, rows) => {
        connection.release();
        if (err) {
          throw err;
        }
      });
      connection.query(query1, param1, (err, rows) => {
        connection.release();
        if (err) {
          throw err;
        }
        likeList(no_detail, res);
      });
    });
  };

  if (likeStatus) {
    let query1 = "DELETE FROM an_like WHERE an_no = ? AND username = ?";
    let query2 = "UPDATE announce SET an_like = an_like - 1 WHERE no =?";
    let param1 = [no_detail, loginId];
    let param2 = [no_detail];
    likeEvent(query1, param1, query2, param2, no_detail);
  } else {
    let query1 = "INSERT INTO an_like (an_no, username) VALUES(?,?)";
    let query2 = "UPDATE announce SET an_like = an_like + 1 WHERE no =?";
    let param1 = [no_detail, loginId];
    let param2 = [no_detail];
    likeEvent(query1, param1, query2, param2, no_detail);
  }
});

module.exports = router;
