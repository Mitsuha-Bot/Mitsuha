const mysql = require('mysql2');
const db = require("../database.json")
const con = mysql.createConnection({
  host: db.host,
  user: db.user,
  database: db.database,
  password: db.password
});
module.exports = con;