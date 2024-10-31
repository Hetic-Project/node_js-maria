const mysql = require('mysql2/promise');

const database = mysql.createPool({
    host: "database",
    port: 3306,
    user: "root",
    password: "root",
    database: "db_maria",
  });
  

module.exports = database;