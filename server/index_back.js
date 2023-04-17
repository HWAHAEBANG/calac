require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
//==============================================
const connectDB = require("./config/connectDB.js");
const db = connectDB.init();
connectDB.open(db);
//==============================================
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//==============================================
// ledger page의 data
app.get("/ledger", (req, res) => {
  const sqlQuery = "select * from ledger";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
    console.log("result", result);
  });
});
//==============================================
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

// /////////
// const db = mysql.createPool({
//   host: "calac.cafe24app.com",
//   user: "root",
//   password: "1234",
//   database: "calacDB",
// });

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// // app.get('/api', (req, res) => {
// //   const sqlQuery = "select * from testtable;"
// //   db.query(sqlQuery, (err, result) => {
// //     res.send(result);
// //     console.log('result', result);
// //   })
// // });

// // ledger page의 data
// app.get("/ledger", (req, res) => {
//   const sqlQuery = "select * from ledger;";
//   db.query(sqlQuery, (err, result) => {
//     res.send(result);
//     console.log("result", result);
//   });
// });

// //scheduler page의 data
// app.get("/scheduler", (req, res) => {
//   const sqlQuery = "select * from scheduler;";
//   db.query(sqlQuery, (err, result) => {
//     res.send(result);
//     console.log("result", result);
//   });
// });

// app.get("/scheduler/event", (req, res) => {
//   const sqlQuery = "select * from event_list;";
//   db.query(sqlQuery, (err, result) => {
//     res.send(result);
//     console.log("result", result);
//   });
// });

// app.post("/scheduler/event", async (req, res) => {
//   const event = req.event;
//   console.log(event);
//   // const sqlQuery =
//   //   "INSERT INTO event_list(event_id,scheduler_no,title,start,end,color,locale,description,reminder,reminderMethod) VALUES(?,?,?,?,?,?,?,?,?,?)";
//   // db.query(
//   //   sqlQuery,
//   //   [
//   //     event.event_id,
//   //     event.scheduler_no,
//   //     event.title,
//   //     event.start,
//   //     event.end,
//   //     event.color,
//   //     event.locale,
//   //     event.description,
//   //     event.reminder,
//   //     event.reminderMethod,
//   //   ],
//   //   (err) => {
//   //     if (err) reject(`${err}`);
//   //     else resolve({ success: true });
//   //   }
//   // );
//   // return res.json(response);
// });
// require("dotenv").config();
// const PORT = process.env.PORT;
