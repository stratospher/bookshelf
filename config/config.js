// require the library
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "light123hash"
  });

// connect to database
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
