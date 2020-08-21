const mysql = require("mysql2");

var config = {
  hostname: "kimyeonsu@localhost",
  host: "kimyeonsu@localhost",
  port: 3306,
  user: "root",
  database: "MOLAB",
};

const conn = new mysql.createConnection(config);

conn.connect(function (err) {
  if (err) {
    console.log("!!! Cannot connect !!! Error:");
    throw err;
  } else {
    console.log("Connection established.");
    readData();
  }
});

function readData() {
  conn.query("SELECT * FROM review", function (err, results, fields) {
    if (err) throw err;
    else console.log("Selected " + results.length + " row(s).");
    for (i = 0; i < results.length; i++) {
      console.log("Row: " + JSON.stringify(results[i]));
    }
    console.log("Done.");
  });
  conn.end(function (err) {
    if (err) throw err;
    else console.log("Closing connection.");
  });
}
