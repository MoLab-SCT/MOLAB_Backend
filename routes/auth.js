var express = require("express");
var router = express.Router();
var jwtFun = require("../config/jwt");
const dbConnection = require("../config/connection");


/* passport logout */
// router.get("/logout", function (req, res, next) {
//   console.log("===== logout =====");
//   req.logout();
//   req.session.save(function () {
//     res.send(true);
//   });
// });

router.post("/getuser", function (req, res, next) {
  let { token } = req.body;
  console.log("===== get user info =====");
  jwtFun.decryption(token, (err, value) => {
    if (err) {
      console.log(err);
      next();
    } else {
      dbConnection((err, connection) => {
        let query = "SELECT id,name FROM USER WHERE ID=?";
        connection.query(query, value.id , (err, rows) => {
          connection.release();
          if (err) {
            throw err;
          }
          console.log(rows);
          return res.send(rows);
        });
      });
    }
  });    
});

module.exports = router;
