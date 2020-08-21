const mysql = require("mysql2");
const config = require("./config");

let pool = mysql.createPool(config);

const getConn = function (callback) {
  pool.getConnection(function (err, connection) {
    callback(err, connection);
  });
};

module.exports = getConn;
