const mysql = require("mysql");

class DatabaseHandler {
  constructor() {
    this.con = null;
  }

  createConnection() {
    this.con = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });

    con.connect((err) => {
      if (err) throw err;
      console.log("Connected!");
    });

    return this.con;
  }

  initDatabase() {
    this.createConnection().query(
      `CREATE DATABASE ${process.env.MYSQL_DATABASE}`,
      (err, result) => {
        if (err) throw err;
        console.log("Database created");
      }
    );
    let sql =
      "CREATE TABLE users (id int PRIMARYKEY AUTO_INCREMENT, name VARCHAR(255), username VARCHAR(10))";
    this.createConnection().query(sql, (err, result) => {
      if (err) throw err;
      console.log("Table users created");
    });

    sql = "CREATE TABLE accounts (username VARCHAR(10), password VARCHAR(10))";
    this.createConnection().query(sql, (err, result) => {
      if (err) throw err;
      console.log("Table accounts created");
    });
  }
}

module.exports = DatabaseHandler;
