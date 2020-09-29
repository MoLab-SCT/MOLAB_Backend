var mysql = require('mysql');
var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'euna',
  database: 'MOLAB',
  dateStrings: 'date',
});

db.connect();
module.exports = db;
