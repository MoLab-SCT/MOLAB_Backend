var express = require("express");
var router = express.Router();
const dbConnection = require("../config/connection");
const RSA = require("node-rsa");
const fs = require("fs");
const rsa = new RSA();
var rsaPublic = fs.readFileSync(__dirname + "/../public/rsa/public_key.pem");
var rsaPrivate = fs.readFileSync(__dirname + "/../public/rsa/private.key");

rsa.importKey(rsaPrivate, "private");
const privateKey = rsa.exportKey("private");
rsa.importKey(rsaPublic, "public");
const publicKey = rsa.exportKey("public");

router.post("/", function(req,res,next){
    let { id, encPw, name} = req.body;
    let decPw = rsa.decrypt(encPw, "utf-8");
    dbConnection((err,connection) => {
        let query = "INSERT INTO user (id, password, name) VALUES (?,?,?)";
        connection.query(
            query,[id,decPw,name],
            (err, rows) => {
              connection.release();
              if (err) {
                throw err;
              }
              console.log("===== insert signup info to user table =====");
              console.log(id, decPw, name);
              return res.send(true);
            }
          );
    });
});

router.get("/",function(req,res,next){
  if (Object.keys(req.query).length === 0) {
    try {
      res.send(publicKey);
    } catch(e) {
      console.log(e);
    }
  }
});

module.exports = router;
