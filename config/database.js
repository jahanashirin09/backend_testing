const mysql = require("mysql2/promise");

const mysqlpool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "tasks",
});
module.exports = mysqlpool;
