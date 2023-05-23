require("dotenv").config();
const mysql = require("mysql");
const connectDB = {
  init: () => {
    return mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      // port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      // multipleStatements: true,
      //===========================================
    });
  },
  open: (con) => {
    con.connect((err) => {
      if (err) {
        console.log("mysql 연결 실패", err);
      } else {
        console.log("mysql 연결성공");
      }
    });
  },
  close: (con) => {
    con.end((err) => {
      if (err) {
        console.log("mysql 종료 실패", err);
      } else {
        console.log("mysql 종료!");
      }
    });
  },
};

module.exports = connectDB;

//CLEARDB_DATABASE_URL
//mysql://beb26cbad5827b:0ba2b98a@us-cdbr-east-06.cleardb.net/heroku_5f173ac1e1d2a1b?reconnect=true
