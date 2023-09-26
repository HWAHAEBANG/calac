const https = require("https");
const http = require("http");
const fs = require("fs");
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const path = require("path");
const sessionAuthMiddleware = require("./middlewares/sessionAuthMiddleware");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

app.use(
  session({
    name: "session",
    secret: process.env.SESSION_SECRET, // 세션을 암호화하는데 사용하는 문자열
    resave: false, // 변경 사항이 없어도 항상 세션 저장
    saveUninitialized: false, //true, 새로운 세션 생성 시에도 세션 저장
    store: new FileStore(), // firestore 사용할 때 추가
    cookie: {
      httpOnly: false, //
      secure: false, // true - HTTPS 프로토콜에서만 사용 가능 // false -http  도 가능
      maxAge: 1000 * 60 * 60 * 24, // 쿠키 유효기간 (1일)
      // sameSite: "strict", // CSRF 공격 방지
    },
  })
);
//==============================================
// const options = {
//   key: fs.readFileSync("./.well-known/validation/calac.key.pem"),
//   cert: fs.readFileSync("./.well-known/validation/calac.crt.pem"),
// };
//==============================================
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//==============================================
// 리액트 파일 라우팅
// app.use(express.static(path.join(__dirname, "./build"))); // 기존코드
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./build", "./index.html"));
// });
app.use(express.static("build"));

app.use(
  /^\/(dashboard|financialledger|diary|comments|scheduler|login)/,
  express.static("build")
);

app.get("/", (req, res) => {
  res.sendFile(__dirname, "/build/index.html");
});

app.use(
  /^\/(aboutUs|allCharts|myCharts|topicNews|notification)/,
  express.static("build")
);

//==============================================
const DASHBOARD = require("./router/main.js");
app.use("/api/dashboard", DASHBOARD);

const LEDGER = require("./router/financialledger.js");
app.use("/api/financialledger", LEDGER);

const DIARY = require("./router/diary.js");
app.use("/api/diary", DIARY);

const COMMENTS = require("./router/comments.js");
app.use("/api/comments", COMMENTS);

const SCHEDULER = require("./router/scheduler.js");
app.use("/api/scheduler", sessionAuthMiddleware, SCHEDULER);

const USERS = require("./router/login.js");
app.use("/api/login", USERS);

// images 폴더 내의 파일들을 외부로 노출 시켜주기 위한 미들웨어
app.use("/images", express.static(path.join(__dirname, "/images")));
//==============================================
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
// http.createServer(app).listen(PORT, () => {
//   console.log(`HTTP : running on port ${PORT}`);
// });
// https.createServer(options, app).listen(PORT, function () {
//   console.log(`HTTPS : running on HTTPS server ${PORT}`);
// });
