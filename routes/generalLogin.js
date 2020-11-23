var express = require("express");
var router = express.Router();
const dbConnection = require("../config/connection");

const RSA = require("node-rsa");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const jwtFun = require("../config/jwt");

const rsa = new RSA();
var rsaPublic = fs.readFileSync(__dirname + "/../public/rsa/public_key.pem");
var rsaPrivate = fs.readFileSync(__dirname + "/../public/rsa/private.key");

rsa.importKey(rsaPrivate, "private");
const privateKey = rsa.exportKey("private");
rsa.importKey(rsaPublic, "public");
const publicKey = rsa.exportKey("public");

router.post("/", function (req, res, next) {
    let { id, encPw } = req.body;
    let password = rsa.decrypt(encPw, "utf-8");
    console.log(id, password);

    dbConnection((err, connection) => {
        connection.query(
          "SELECT * FROM USER WHERE ID=? AND PASSWORD=?",
          [id, password],
          (err, result) => {
            connection.release();
            console.log(result);
            if (err) {
              console.log("mysql query send error");
              throw err;
            }
            if (result.length === 0) {
              console.log("no matched result");
              res.send("false");
            } else {
              var json = JSON.stringify(result[0]);
              var userinfo = JSON.parse(json);
              console.log("===== successfully find result =====");
              console.log(userinfo);

              jwtFun.encryption({id: id}, (err, token) => {
                  if(err){
                      console.log(err);
                      next();
                  }
                  else{
                      console.log(token);
                      res.send(token);
                  }
              });
            }
          }
        );
    });
});
module.exports = router;
