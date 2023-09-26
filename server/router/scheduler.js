const express = require("express");
const router = express.Router();
//DB연결부 =====================================
const connectDB = require("../config/connectDB.js");
const db = connectDB.init();
connectDB.open(db);
//==============================================
// 이벤트 데이터 받아오기 =========================
router.get("/", (req, res) => {
  const currentUserNo = req.query.currentUserNo;
  const sqlQuery = "SELECT * FROM event_list WHERE user_no = ?";
  db.query(sqlQuery, [currentUserNo], (err, result) => {
    res.send(result);
    console.log("result", result);
  });
});

//==============================================
// 이벤트 추가하기 ==============================
router.post("/insert", (req, res) => {
  const title = req.body.title;
  const start = req.body.start;
  const end = req.body.end;
  const color = req.body.color;
  const locale = req.body.locale;
  const user_no = req.body.user_no;
  const sqlQuery =
    "INSERT INTO event_list(title,start,end,color,locale,user_no) VALUES(?,?,?,?,?,?);";
  db.query(
    sqlQuery,
    [title, start, end, color, locale, user_no],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const newEvent = {
          id: result.insertId, // Get the newly inserted id
          title,
          start,
          end,
          color,
          locale,
        };
        res.send(newEvent);
      }
    }
  );
});

// 이벤트 수정하기 (기간, 내용 모두 해당) =========
//==============================================
router.put("/update/:id", (req, res) => {
  const title = req.body.title;
  const start = req.body.start;
  const end = req.body.end;
  const color = req.body.color;
  const locale = req.body.locale;
  const id = req.params.id;
  const sqlQuery =
    "UPDATE event_list SET title=?, start=?, end=?, color=?, locale=? WHERE id = ?;";
  db.query(sqlQuery, [title, start, end, color, locale, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const updatedEvent = {
        id: req.params.id,
        title,
        start,
        end,
        color,
        locale,
      };
      res.send(updatedEvent);
    }
  });
});

// 이벤트 삭제하기 ==============================
//==============================================
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlQuery = `DELETE FROM event_list WHERE id = ${id};`;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("success!");
    }
  });
});

// 카테고리 목록 가져오기  =======================
//==============================================
router.get("/category", (req, res) => {
  const currentUserNo = req.query.currentUserNo;
  const sqlQuery = "SELECT * FROM category_list WHERE user_no = ?";
  db.query(sqlQuery, [currentUserNo], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log('카테고리',result);
    }
  });
});

// 카테고리 추가하기 ============================
//==============================================
router.post("/category/insert", (req, res) => {
  const value = req.body.value;
  const label = req.body.label;
  const user_no = req.body.user_no;
  const sqlQuery =
    "INSERT INTO category_list(value,label,user_no) VALUES(?,?,?);";
  db.query(sqlQuery, [value, label, user_no], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const newCategory = {
        id: result.insertId, // Get the newly inserted id
        value,
        label,
      };
      res.send(newCategory);
    }
  });
});

// 카테고리 색상 수정하기하기 ====================
//==============================================
router.put("/category/update/:id", (req, res) => {
  const value = req.body.value;
  const label = req.body.label;
  const id = req.params.id;
  const sqlQuery = "UPDATE category_list SET value=?, label=? WHERE id = ?;";
  db.query(sqlQuery, [value, label, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const updatedCategory = {
        id: req.params.id,
        value,
        label,
      };
      res.send(updatedCategory);
    }
  });
});

// 카테고리 삭제하기 ============================
//==============================================
router.delete("/category/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlQuery = `DELETE FROM category_list WHERE id = ${id};`;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("success!");
    }
  });
});

//=============================================
// 카테고리 색상 수정할 때 해당 카테고리의 기존 이벤트들 색상도 바꿔주기 ==
router.put("/event/color/update/:value", (req, res) => {
  const newvalue = req.body.color;
  const prevalue = req.params.value;
  const sqlQuery = "UPDATE event_list SET color=? WHERE color = ?;";
  db.query(sqlQuery, [newvalue, prevalue], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ message: "Updated successfully" });
    }
  });
});

//====================================
// 카테고리 색상 삭제할 때 해당 카테고리의 기존 이벤트들도 일괄 삭제하기 ==
router.delete("/event/color/delete/:value", (req, res) => {
  const prevalue = req.params.value;
  const sqlQuery = `DELETE FROM event_list WHERE color = ?;`;
  db.query(sqlQuery, [prevalue], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ message: "Deleted successfully" });
    }
  });
});

module.exports = router;
